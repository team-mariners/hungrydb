# frozen_string_literal: true

class OrderController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    insert()
  end

  private

  def order_params
    # for permit all object keys need to be permitted individually,
    # which can't be done for foods with unknown keys
    params.require(:order)
  end

  def insert
    filtered_params = order_params

    ActiveRecord::Base.connection.begin_db_transaction

    # Insert the order
    ActiveRecord::Base.connection.exec_query(
      "INSERT INTO Orders(customer_id, promo_id, restaurant_id, point_offset, payment_method,
                   delivery_fee, total_price, date_time, status)
      VALUES (#{current_user.id},  #{filtered_params['promo_id']},
              #{filtered_params['restaurant_id']}, #{filtered_params['point_offset']},
              '#{filtered_params['payment_method']}', #{filtered_params['delivery_fee']},
              #{filtered_params['total_price']}, CURRENT_TIMESTAMP, '#{filtered_params['status']}')"
    )

    # Get the user's latest order
    stored_order = ActiveRecord::Base.connection.exec_query(
      "SELECT *
      FROM Orders
      WHERE date_time >= ALL (
              SELECT date_time
              FROM Orders O
              WHERE O.customer_id = #{current_user.id}
            )"
    ).to_a[0]

    # Insert corresponding Delivers entry
    ActiveRecord::Base.connection.exec_query(
      "INSERT INTO Delivers(oid, customer_location, order_time)
      VALUES (#{stored_order['oid']}, '#{filtered_params['customer_location']}',
              CURRENT_TIMESTAMP)"
    )

    # Insert corresponding Comprises entry and add num_order to food
    foods = filtered_params['foods']
    foods.each do |foodKey, foodDetails|
      ActiveRecord::Base.connection.exec_query(
        "INSERT INTO Comprises
        VALUES (#{stored_order['oid']}, #{foodDetails['id']}, #{foodDetails['quantity']})"
      )
    end

    # Updates for Foods num_order, Promos num_redeemed and
    # Customers rewardPoints handled with Triggers

    ActiveRecord::Base.connection.commit_db_transaction

    cookies[:oid] = stored_order['oid']

    assign_order_to_rider(stored_order['oid'])
  end

  def assign_order_to_rider(oid)
    # Assigns Order to the rider with the earliest prior Delivery
    ActiveRecord::Base.connection.begin_db_transaction

    # 1. AvailableRiders: FullTimeRiders or PartTimeRiders that are working today at this time.
    # 2. RidersPriorDeliveryTime:
    #    i) Get latest completed delivery times for all Riders (if latest time is null but
    #       they are present in Delivers table, they are in the midst of their 1st ever Delivery).
    #    ii) AvailableRiders who are not in Delivers (never delivered) found with
    #        RidersWithoutDeliveries subquery have their latest delivery
    #        set to '1970-01-01 00:00:00-00', the "dawn of time" itself.
    #    iii) Union Riders within or without Delivers table.
    # 3. Get the earliest prior delivery time.
    earliest_rider_query =
      "WITH
        AvailableRiders AS
          (SELECT F.id as rider_id
          FROM Full_time_riders F INNER JOIN Monthly_work_schedules M
               ON F.id = M.rider_id
               INNER JOIN Weekly_work_schedules W USING (mws_id)
               INNER JOIN Working_intervals I USING (wws_id)
          WHERE TO_CHAR(NOW(), 'FMDay') = I.workingDay::text
                AND EXTRACT(HOUR FROM CURRENT_TIMESTAMP) >= EXTRACT(HOUR FROM I.startHour)
                AND EXTRACT(HOUR FROM CURRENT_TIMESTAMP) <= EXTRACT(HOUR FROM I.endHour)
          UNION
          SELECT P.id as rider_id
          FROM Part_time_riders P INNER JOIN Weekly_work_schedules W
               ON P.id = W.pt_rider_id
               INNER JOIN Working_intervals I USING (wws_id)
          WHERE TO_CHAR(NOW(), 'FMDay') = I.workingDay::text
               AND EXTRACT(HOUR FROM CURRENT_TIMESTAMP) >= EXTRACT(HOUR FROM I.startHour)
               AND EXTRACT(HOUR FROM CURRENT_TIMESTAMP) <= EXTRACT(HOUR FROM I.endHour)
          ),
        RidersPriorDeliveryTime AS
          (SELECT rider_id, MAX(order_delivered_time) AS priordeliverytime
          FROM Delivers
          GROUP BY rider_id
          HAVING MAX(order_delivered_time) IS DISTINCT FROM null
          UNION
          SELECT rider_id, TIMESTAMP '1970-01-01 00:00:00-00' as priordeliverytime
          FROM (
            SELECT rider_id FROM AvailableRiders
            EXCEPT
            SELECT rider_id FROM Delivers D
          ) AS RidersWithoutDeliveries
          )
      SELECT rider_id
      FROM RidersPriorDeliveryTime
      WHERE priordeliverytime <= ALL (
        SELECT priordeliverytime
        FROM RidersPriorDeliveryTime
      )"

    selected_rider_id = ActiveRecord::Base.connection.exec_query(earliest_rider_query)
                                          .to_a[0]['rider_id']

    assign_rider_command =
      "UPDATE Delivers
      SET rider_id = #{selected_rider_id}
      WHERE oid = #{oid}"

    ActiveRecord::Base.connection.exec_query(assign_rider_command)

    ActiveRecord::Base.connection.commit_db_transaction

    # Attempt OUTER JOIN & COALESCE, but Riders who have just been assigned their 1st
    # Delivery (in Delivers but latest delivered time null) will keep getting assigned
    # RidersPriorDeliveryTime AS
    #   (SELECT D.rider_id,
    #   COALESCE(MAX(order_delivered_time), TIMESTAMP '1970-01-01 00:00:00-00')
    #   AS priordeliverytime
    #   FROM AvailableRiders NATURAL LEFT OUTER JOIN Delivers
    #   GROUP BY rider_id
    #   )
  end
end
