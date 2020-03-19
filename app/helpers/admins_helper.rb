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
        ).first

        if current_role == nil
            return false
        end

        ActiveRecord::Base.connection.exec_query(
            "INSERT INTO #{role}s(user_id, created_at, updated_at) VALUES
            (#{userid}, 'now', 'now');"
        )

        ActiveRecord::Base.connection.exec_query(
            "UPDATE users SET roles = '#{role}'
            WHERE id = #{userid};"
        )

        ActiveRecord::Base.connection.exec_query(
            "DELETE FROM #{current_role['roles']}s
            WHERE user_id = #{userid};"
        )

        return true
    end

    protected
    def get_users_count
        return ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*) FROM users"
        ).first['count']
    end

    def get_admins_count
        return ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*) FROM admins"
        ).first['count']
    end

    def get_managers_count
        return ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*) FROM managers"
        ).first['count']
    end

    def get_riders_count
        return ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*) FROM riders"
        ).first['count']
    end

    def get_customers_count
        return ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*) FROM customers"
        ).first['count']
    end

    def get_restaurants_count
        return ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*) FROM restaurants"
        ).first['count']
    end

    def get_food_count
        return ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*) FROM foods"
        ).first['count']
    end
end
