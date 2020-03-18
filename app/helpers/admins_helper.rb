module AdminsHelper
    def get_statistics
        output = {
            numUsers: get_users_count,
            numAdmins: get_admins_count,
            numManagers: get_managers_count,
            numRiders: get_riders_count,
            numCustomers: get_customers_count,
            numRestaurants: get_restaurants_count,
            numFood: get_food_count
        }

        return output
    end

    def set_role(userid, role)
        if user_has_role?(userid, role)
            return false
        elsif !is_valid_role?(role)
            return false
        end

        current_role = ActiveRecord::Base.connection.exec_query(
            "SELECT roles FROM users
            WHERE id = #{userid};"
        ).to_a[0]

        ActiveRecord::Base.connection.exec_query(
            "INSERT INTO #{role}s(id) VALUES (#{userid});"
        )

        ActiveRecord::Base.connection.exec_query(
            "UPDATE users SET roles = '#{role}'
            WHERE id = #{userid};"
        )

        ActiveRecord::Base.connection.exec_query(
            "DELETE FROM #{current_role}s
            WHERE id = #{userid};"
        )

        return true
    end

    protected
    def get_users_count
        return ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*) FROM users"
        ).to_a[0]
    end

    def get_admins_count
        return ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*) FROM admins"
        ).to_a[0]
    end

    def get_managers_count
        return ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*) FROM managers"
        ).to_a[0]
    end

    def get_riders_count
        return ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*) FROM riders"
        ).to_a[0]
    end

    def get_customers_count
        return ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*) FROM customers"
        ).to_a[0]
    end

    def get_restaurants_count
        return ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*) FROM restaurants"
        ).to_a[0]
    end

    def get_food_count
        return ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*) FROM foods"
        ).to_a[0]
    end
end
