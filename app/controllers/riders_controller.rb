class RidersController < UsersController  
  before_action do
    verify_role!('rider')
  end
  
  def index; end    

  def check_clocked_in        
    result = get_clocked_in_data
    render json: result
  end

  def clock_in   
    result = nil;
      
    ActiveRecord::Base.connection.begin_db_transaction    
    ActiveRecord::Base.connection.exec_query(
      "INSERT INTO attendance(id, w_date, clock_in)
      VALUES(#{current_user["id"]}, CURRENT_DATE, CURRENT_TIME);"      
    )
  
    result = get_clocked_in_data
    ActiveRecord::Base.connection.commit_db_transaction
  
    render json: result
  end

  def clock_out
    result = nil

    ActiveRecord::Base.connection.begin_db_transaction          
    # The common table expression calculates the total hours the rider worked so far today by summing up 
    # all the work intervals at the current day which the start_time is AFTER OR EQUAL to the clock in time       
    # and the endTime is BEFORE OR EQUAL to the clock out time. 
    # After that, assign the total number of hours worked to the corresponding attendance entry.
    ActiveRecord::Base.connection.exec_query(        
      "WITH T AS (
        SELECT SUM(date_part('hour', endHour - startHour)) as totalHours
        FROM working_intervals
        WHERE workingDay::text = trim(to_char(CURRENT_TIMESTAMP, 'Day'))
        AND startHour >= (
          SELECT clock_in 
          FROM attendance 
          WHERE id =#{current_user["id"]} AND w_date = CURRENT_DATE)
        AND endHour <= CURRENT_TIME
        AND wws_id = (
          SELECT CASE (SELECT r_type FROM Riders WHERE user_id=#{current_user["id"]})
            WHEN 'full_time' THEN (
              SELECT wws_id
              FROM weekly_work_schedules
              WHERE w_type = 'monthly_work_schedule'
              AND mws_id = (
                SELECT mws_id
                FROM monthly_work_schedules
                WHERE rider_id = #{current_user["id"]}
              )
            )
            WHEN 'part_time' THEN (
              SELECT wws_id
              FROM weekly_work_schedules
              WHERE w_type = 'part_time_rider'
              AND pt_rider_id = #{current_user["id"]}
            )
            END AS id                    
        )
      )
      UPDATE attendance
      SET clock_out = CURRENT_TIME, total_hours = COALESCE((SELECT totalHours FROM T), 0)
      WHERE id=#{current_user["id"]}
      AND w_date = CURRENT_DATE;"
    )

    result = get_clocked_in_data
    ActiveRecord::Base.connection.commit_db_transaction

    render json: result
  end

  # Get all the deliveries of the rider
  def get_deliveries
    deliveries = ActiveRecord::Base.connection.exec_query(
      "SELECT *, 
        (SELECT name FROM Restaurants WHERE id = (SELECT restaurant_id FROM Orders O WHERE O.oid = D.oid))
          AS restaurant_name,
        (SELECT address FROM Restaurants WHERE id = (SELECT restaurant_id FROM Orders O WHERE O.oid = D.oid))
          AS restaurant_address
      FROM Delivers D
      WHERE rider_id = #{current_user["id"]}"
    ).to_a
    render json: deliveries
  end

  # Get the order of a delivery
  def get_order
    ActiveRecord::Base.connection.begin_db_transaction
    order = ActiveRecord::Base.connection.exec_query(
      "SELECT oid, payment_method, delivery_fee, (total_price - delivery_fee) AS total_cost,
        (SELECT username FROM Users WHERE id = Orders.customer_id) AS customer_name
      FROM Orders
      WHERE oid = #{params["id"]};"
    ).to_a[0]

    foods = ActiveRecord::Base.connection.exec_query(
      "SELECT *
      FROM (SELECT * FROM Comprises WHERE oid=#{params["id"]}) AS T 
        JOIN Foods F ON (T.food_id = F.id)
      ORDER BY F.id;"
    ).to_a
    ActiveRecord::Base.connection.commit_db_transaction

    order["foods"] = foods      
    render json: order
  end
  
  # SET the first null time field of the specified delivery entry to current time
  def update_time
    ActiveRecord::Base.connection.begin_db_transaction
    target_column = ActiveRecord::Base.connection.exec_query(
      "SELECT CASE 
          WHEN depart_to_restaurant_time IS NULL THEN 'depart_to_restaurant_time'
          WHEN arrive_at_restaurant_time IS NULL THEN 'arrive_at_restaurant_time'
          WHEN depart_to_customer_time IS NULL THEN 'depart_to_customer_time'
          WHEN order_delivered_time IS NULL THEN 'order_delivered_time'
          ELSE NULL
        END AS column_name
      FROM Delivers
      WHERE oid = #{params[:id]}"
    ).rows[0][0]

    if target_column.nil?
      render json: "The delivery is already completed", status: 405
      return
    end

    ActiveRecord::Base.connection.exec_query(
      "UPDATE Delivers    
      SET #{target_column} = CURRENT_TIMESTAMP
      WHERE oid = #{params[:id]};"
    )

    time = ActiveRecord::Base.connection.exec_query(
      "SELECT #{target_column}
      FROM Delivers
      WHERE oid = #{params[:id]}"
    ).rows[0][0]
    ActiveRecord::Base.connection.commit_db_transaction

    render json: {name: target_column, time: time}
  end

  def get_salary_summary_data
    ActiveRecord::Base.connection.begin_db_transaction
    salary = ActiveRecord::Base.connection.exec_query(
      "SELECT (base_salary + commission) AS salary, commission
      FROM rider_salaries
      WHERE start_date BETWEEN '#{params[:start_date]}' AND '#{params[:end_date]}'
      AND rider_id = #{current_user["id"]};"
    ).to_a[0] 

    salary = salary.nil? ? {salary: nil, commission: nil} : salary

    total_completed_orders = ActiveRecord::Base.connection.exec_query(
      "SELECT count(*) AS total_completed_orders
      FROM Orders
      WHERE oid IN (
        SELECT oid
        FROM Delivers
        WHERE rider_id = #{current_user["id"]}
      )
      AND status = 'complete'
      AND date_time BETWEEN '#{params["start_date"]}' AND '#{params["end_date"]}';"
    ).to_a[0]    

    total_hours_worked = ActiveRecord::Base.connection.exec_query(
      "SELECT COALESCE(sum(total_hours), 0) AS total_hours_worked
      FROM attendance
      WHERE id = #{current_user["id"]}
      AND w_date BETWEEN '#{params["start_date"]}' AND '#{params["end_date"]}';"
    ).to_a[0]
    ActiveRecord::Base.connection.commit_db_transaction

    render json: {**(salary.symbolize_keys), **(total_completed_orders.symbolize_keys),
      **(total_hours_worked.symbolize_keys)}
  end

  private

  def get_clocked_in_data
    ActiveRecord::Base.connection.exec_query(
      "SELECT *
      FROM attendance
      WHERE id = #{current_user["id"]}
      AND w_date = CURRENT_DATE;"
    ).to_a[0]
  end
end