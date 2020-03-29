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

    def get_existing_restaurant(userid)
        managerid = ActiveRecord::Base.connection.exec_query(
            "SELECT id FROM managers
            WHERE user_id = #{userid};"
        ).first

        if (managerid == nil)
            return nil
        else
            restaurant = ActiveRecord::Base.connection.exec_query(
                "SELECT * FROM restaurants
                WHERE manager_id = #{managerid['id']};"
            ).first
            return restaurant
        end
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

        role_attr = ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*) FROM #{role}s
            WHERE user_id = #{userid};"
        ).first['count']

        ActiveRecord::Base.connection.begin_db_transaction();

        # Preserve previously stored role attributes
        if role_attr == 0
            ActiveRecord::Base.connection.exec_query(
                "INSERT INTO #{role}s(user_id, created_at, updated_at) VALUES
                (#{userid}, 'now', 'now');"
            )
        else
            ActiveRecord::Base.connection.exec_query(
                "UPDATE #{role}s SET updated_at = 'now'
                WHERE user_id = #{userid}"
            )
        end

        ActiveRecord::Base.connection.exec_query(
            "UPDATE users SET roles = '#{role}'
            WHERE id = #{userid};"
        )

        ActiveRecord::Base.connection.commit_db_transaction();

        return true
    end

    def create_restaurant(name, minordercost, address, userid)
        userrole = ActiveRecord::Base.connection.exec_query(
            "SELECT roles FROM users
            WHERE id = #{userid};"
        ).first

        if (userrole == nil || userrole['roles'] != 'manager')
            return false
        end

        managerid = ActiveRecord::Base.connection.exec_query(
            "SELECT id FROM managers
            WHERE user_id = #{userid};"
        ).first['id']

        ActiveRecord::Base.connection.exec_query(
            "INSERT INTO restaurants(name, min_order_cost, address, manager_id)
            VALUES ('#{name}', '#{minordercost}', '#{address}', '#{managerid}');"
        )

        return true
    end

    protected
    def get_users_count
        return ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*) FROM users;"
        ).first['count']
    end

    def get_admins_count
        return ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*) FROM users
            WHERE roles = 'admin';"
        ).first['count']
    end

    def get_managers_count
        return ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*) FROM users
            WHERE roles = 'manager';"
        ).first['count']
    end

    def get_riders_count
        return ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*) FROM users
            WHERE roles = 'rider';"
        ).first['count']
    end

    def get_customers_count
        return ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*) FROM users
            WHERE roles = 'customer';"
        ).first['count']
    end

    def get_restaurants_count
        return ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*) FROM restaurants;"
        ).first['count']
    end

    def get_food_count
        return ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*) FROM foods;"
        ).first['count']
    end
end
