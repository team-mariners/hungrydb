# frozen_string_literal: true

module Api::V1::Orders::OrdersHelper
  def retrieve_orders
    orders_query = "SELECT *
                   FROM Orders
                   ORDER BY date_time DESC"
    ActiveRecord::Base.connection.execute(orders_query)
  end

  def retrieve_customer_orders
    customer_orders_query = "SELECT *
                            FROM Orders
                            WHERE customer_id = #{current_user.id}
                            ORDER BY date_time DESC"
    ActiveRecord::Base.connection.execute(customer_orders_query)
  end
  
  def retrieve_order_foods(oid)
    order_food_query = "SELECT F.id, F.f_name, F.price, C.quantity
                       FROM Comprises C INNER JOIN Foods F
                            ON C.oid = #{oid} and C.food_id = F.id"
    ActiveRecord::Base.connection.execute(order_food_query)
  end

  def retrieve_order_customer(oid)
    order_customer_query = "SELECT U.username
                           FROM Orders O INNER JOIN Users U
                                ON O.oid = #{oid} and O.customer_id = U.id
                           LIMIT 1"
    ActiveRecord::Base.connection.execute(order_customer_query)[0]['username']
  end

  def retrieve_order_address(oid)
    address_query = "SELECT customer_location
                    FROM Delivers
                    WHERE oid = #{oid}
                    LIMIT 1"
    ActiveRecord::Base.connection.execute(address_query)[0]['customer_location']
  end
end
