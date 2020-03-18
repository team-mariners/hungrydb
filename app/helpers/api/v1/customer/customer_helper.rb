# frozen_string_literal: true

module Api::V1::Customer::CustomerHelper
  def retrieve_customer
    current_customer_query = "SELECT *
                              FROM Customers
                              WHERE user_id = #{current_user.id}
                              LIMIT 1"
    Customer.find_by_sql(current_customer_query)
  end

  def retrieve_last_order
    last_order_query = "SELECT *
                       FROM Orders
                       WHERE customer_id = #{current_user.id}
                       ORDER BY date_time DESC
                       LIMIT 1"
    ActiveRecord::Base.connection.execute(last_order_query)
  end

  def retrieve_two_promos
    two_promos_query = "SELECT *
                       FROM Promotions P INNER JOIN Fds_Promotions F
                            ON P.id = F.promotion_id
                       LIMIT 2"
    ActiveRecord::Base.connection.execute(two_promos_query)
  end
end
