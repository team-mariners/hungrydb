module RidersHelper
    def get_rider_info_bundle
        rider = current_user.attributes

        puts rider
        
        rider_type = ActiveRecord::Base.connection.exec_query(
            "SELECT r_type
            FROM riders
            WHERE user_id = #{rider["id"]};"
        ).to_a[0]["r_type"]

        rider["r_type"] = rider_type        
        return rider
    end

    def get_rider_schedule
        # From admin helpers
        return get_rider_schedule_matrix(current_user["id"])
    end
end