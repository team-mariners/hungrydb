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

    def get_riders_statistics
        output = {
            numWeeklyOrder: get_weekly_orders_count,
            numMonthlyOrder: get_monthly_orders_count,
            numTotalOrder: get_total_orders_count,
            numWeeklyHoursWorked: get_weekly_hours_worked,
            numMonthlyHoursWorked: get_monthly_hours_worked,
            totalWeeklyComission: get_weekly_comission,
            totalMonthlyComission: get_monthly_comission,
            baseSalary: get_base_salary
        }

        return output
    end

    protected
    def get_weekly_orders_count
        return ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*)
            FROM Delivers D join Orders O
                on D.oid = O.oid
            WHERE D.depart_to_customer_time >= now() - interval '1 week'
            and D.rider_id =#{current_user["id"]}
            ;"
        ).first['count']
    end

    protected
    def get_monthly_orders_count
        return ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*)
            FROM Delivers D join Orders O
                on D.oid = O.oid
            WHERE D.depart_to_customer_time >= now() - interval '1 month'
            and D.rider_id =#{current_user["id"]}
            ;"
        ).first['count']
    end
    
    protected
    def get_total_orders_count
        return ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*)
            FROM Delivers D join Orders O
                on D.oid = O.oid
            WHERE D.rider_id =#{current_user["id"]}
            ;"
        ).first['count']
    end

    protected
    def get_weekly_hours_worked
        return ActiveRecord::Base.connection.exec_query(
            "SELECT SUM(total_hours)
            FROM Attendance a
            WHERE a.id =#{current_user["id"]}
            and a.w_date >= now() - interval '1 week'
            ;"
        ).first['count']
    end

    protected
    def get_monthly_hours_worked
        return ActiveRecord::Base.connection.exec_query(
            "SELECT SUM(total_hours)
            FROM Attendance a
            WHERE a.id =#{current_user["id"]}
            and a.w_date >= now() - interval '1 month'
            ;"
        ).first['count']
    end

    #to calculate the amount of bonus(in a week) a rider earned for completing orders
    #get the total number of order multiply by comission per order of the rider
    protected
    def get_weekly_comission
        return ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*) * 1.2
            FROM Riders R join (Delivers D join Orders O
                on D.oid = O.oid) on R.user_id = D.rider_id
            WHERE D.depart_to_customer_time >= now() - interval '1 week'
            and D.rider_id =#{current_user["id"]}
            ;"
        ).first['count']
    end

    #to calculate the amount of bonus(in a month) a rider earned for completing orders
    #get the total number of order multiply by comission per order of the rider
    protected
    def get_monthly_comission
        return ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*) * 1.2
            FROM Riders R join (Delivers D join Orders O
                on D.oid = O.oid) on R.user_id = D.rider_id
            WHERE D.depart_to_customer_time >= now() - interval '1 month'
            and D.rider_id =#{current_user["id"]}
            ;"
        ).first['count']
    end

    protected
    def get_base_salary
        return ActiveRecord::Base.connection.exec_query(
            "SELECT CASE r_type
                WHEN 'full_time' THEN (SELECT monthly_base_salary FROM full_time_riders WHERE id = R.user_id)
                WHEN 'part_time' THEN (SELECT weekly_base_salary FROM part_time_riders WHERE id = R.user_id)
             END as base_salary
            FROM Riders R
            WHERE user_id = #{current_user["id"]};"
        )
    end
end