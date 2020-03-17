# frozen_string_literal: true

module Api::V1::Orders::OrdersHelper
  def retrieve_orders
    orders_query = "SELECT *
                   FROM Orders
                   WHERE customer_id = #{current_user.id}"
    ActiveRecord::Base.connection.execute(orders_query)
  end
  
  def retrieve_order_foods(oid)
    order_food_query = "SELECT F.id, F.f_name, F.price
                       FROM Comprises C INNER JOIN Foods F
                            ON C.oid = #{oid} and C.food_id = F.id"
    ActiveRecord::Base.connection.execute(order_food_query)
  end
end
