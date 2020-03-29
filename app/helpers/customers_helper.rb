# frozen_string_literal: true

module CustomersHelper
  def customer_info_bundle
    # Get the current user and customer
    user = current_user
    customer_sql = "SELECT *
                    FROM Customers
                    WHERE user_id = #{user.id}
                    LIMIT 1"
    customer = Customer.find_by_sql(customer_sql)[0]

    # Customise the object to return to the view
    # user_hash keys are id, username, email, roles, customer_id
    user_hash = get_user_hash(user)
    user_hash['customer_id'] = customer.id
    user_hash['points'] = customer.reward_points

    # Return the object
    user_hash
  end
end
