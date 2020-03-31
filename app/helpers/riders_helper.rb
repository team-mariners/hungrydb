module RidersHelper
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
            "SELECT COUNT(*)*comission
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
            "SELECT COUNT(*)*comission
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
            "SELECT CASE
                WHEN R.user_id = ftr.id then ftr.monthlyBaseSalary
                WHEN R.user_id = ptr.id then ptr.weeklyBaseSalary
            end as salary
            FROM Riders R, full_time_riders ftr, part_time_riders ptr
            WHERE R.user_id = #{current_user["id"]}
            and
            (R.user_id = ftr.id
            or R.user_id = ptr.id)
            ;"
        ).first['salary']
    end

end