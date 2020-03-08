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

    protected
    def get_users_count
        return User.all.count
    end

    def get_admins_count
        return Admin.all.count
    end

    def get_managers_count
        return Manager.all.count
    end

    def get_riders_count
        return Rider.all.count
    end

    def get_customers_count
        return Customer.all.count
    end

    def get_restaurants_count
        return Restaurant.all.count
    end

    def get_food_count
        return Food.all.count
    end
end
