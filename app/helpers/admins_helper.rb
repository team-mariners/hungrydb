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

    def give_role(userid, role)
        if user_has_role?(userid, role)
            return false
        elsif !is_valid_role?(role)
            return false
        end

        user = User.find_by(id: userid)

        rolelist = user.roles.split(",")
        rolelist.push(role)
        roles = rolelist.sort.join(",")

        role.capitalize.constantize.create(
            user_id: user.id
        )
        user.roles = roles
        user.save
        return true
    end

    def remove_role(userid, role)
        if !user_has_role?(userid, role)
            return false
        elsif !is_valid_role?(role)
            return false
        end

        user = User.find_by(id: userid)

        rolelist = user.roles.split(",")
        rolelist.delete(role)
        roles = rolelist.join(",")

        user.roles = roles
        user.save
        record = role.capitalize.constantize.find_by(user_id: user.id)
        record.destroy
        return true
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
