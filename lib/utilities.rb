module Utilities
    def Utilities.get_restaurant(user)
        Manager.find_by(user_id: user.id).restaurant
    end
end