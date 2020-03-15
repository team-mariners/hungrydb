# frozen_string_literal: true

module Api::V1::Customer::CustomerHelper
  def get_customer
    current_customer_query = "SELECT *
                              FROM Customers
                              WHERE user_id = #{current_user.id}
                              LIMIT 1"
    Customer.find_by_sql(current_customer_query)
  end
end
