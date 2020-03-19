module ApplicationHelper
    def get_restaurant(user)
        manager_id = ActiveRecord::Base.connection.exec_query(
            "SELECT id FROM managers
            WHERE user_id = #{user.id};"
        ).to_a[0]
    
        restaurant = ActiveRecord::Base.connection.exec_query(
            "SELECT * FROM restaurants
            WHERE manager_id = #{manager_id["id"]};"
        ).to_a[0]
      end
end
