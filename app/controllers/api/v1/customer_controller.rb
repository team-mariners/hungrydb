class Api::V1::CustomerController < Api::V1::BaseController
    def index
        current_customer_query = "SELECT *
                                  FROM Customers
                                  WHERE user_id = #{current_user.id}
                                  LIMIT 1"
        last_order_query = ['Hardcoded Last Order 1']
        last_review_query = nil
        eligiblepromos_query = ['HARDCODED1', 'HARDCODED2']
        respond_with ['customer': Customer.find_by_sql(current_customer_query),
                        last_order: last_order_query, last_review: last_review_query, promos: eligiblepromos_query]
    end
  
    def create
        # insert_customer = "INSERT INTO Customers(user_id, can, cvv, rewardPoints, locationHistory)
        #                    VALUES (#{item_params_values})"
        # respond_with :api, :v1, ActiveRecord::Base.connection.execute(insert_customer)
        respond_with :api, :v1, Customer.create(item_params)
    end
  
    def destroy
        delete_customer = "DELETE FROM Customers
                           WHERE Customers.id = #{Customer[:id]}"
        respond_with ActiveRecord::Base.connection.execute(delete_customer)
        # respond_with Customer.destroy(Customer[:id])
    end
  
    def update
        # update_customer = "UPDATE Customers
        #                    SET can = , cvv = , rewardPoints = , locationHistory =
        #                    WHERE Customers.id = Customer[:id]"
        # respond_with ActiveRecord::Base.connection.execute(update_customer)
        customer = Customer.find(params["id"])
        customer.update_attributes(item_params)
        respond_with customer, json: customer
    end
  
    private
  
    def item_params
        # Returns key-value set
        params.require(:customer).permit(:user_id, :can, :cvv, :rewardPoints, :locationHistory)
    end
end
