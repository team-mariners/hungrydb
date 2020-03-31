module RidersHelper
    def get_riders_statistics
        output = {

        }

        return output
    end

    protected
    def get_weekly_orders_count(rid)
        return ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*)
            FROM Delivers D join Orders O
                on D.oid = O.oid
            WHERE D.depart_to_customer_time >= now() - interval '1 week'
            and D.rider_id = #{rid}
            ;"
        ).first['count']
    end

    protected
    def get_monthly_orders_count(rid)
        return ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*)
            FROM Delivers D join Orders O
                on D.oid = O.oid
            WHERE D.depart_to_customer_time >= now() - interval '1 month'
            and D.rider_id = #{rid}
            ;"
        ).first['count']
    end
    
    protected
    def get_total_orders_count(rid)
        return ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*)
            FROM Delivers D join Orders O
                on D.oid = O.oid
            WHERE D.rider_id = #{rid}
            ;"
        ).first['count']
    end

    protected
    def get_weekly_hours_worked(rid)
        return ActiveRecord::Base.connection.exec_query(
            "SELECT SUM(total_hours)
            FROM Attendance a
            WHERE a.id = #{rid}
            and a.w_date >= now() - interval '1 week'
            ;"
        ).first['count']
    end

    protected
    def get_monthly_hours_worked(rid)
        return ActiveRecord::Base.connection.exec_query(
            "SELECT SUM(total_hours)
            FROM Attendance a
            WHERE a.id = #{rid}
            and a.w_date >= now() - interval '1 month'
            ;"
        ).first['count']
    end

    #to calculate the amount of bonus(in a week) a rider earned for completing orders
    #get the total number of order multiply by comission per order of the rider
    protected
    def get_weekly_comission(rid)
        return ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*)*comission
            FROM Riders R join (Delivers D join Orders O
                on D.oid = O.oid) on R.user_id = D.rider_id
            WHERE D.depart_to_customer_time >= now() - interval '1 week'
            and D.rider_id = #{rid}
            ;"
        ).first['count']
    end

    #to calculate the amount of bonus(in a month) a rider earned for completing orders
    #get the total number of order multiply by comission per order of the rider
    protected
    def get_weekly_comission(rid)
        return ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*)*comission
            FROM Riders R join (Delivers D join Orders O
                on D.oid = O.oid) on R.user_id = D.rider_id
            WHERE D.depart_to_customer_time >= now() - interval '1 month'
            and D.rider_id = #{rid}
            ;"
        ).first['count']
    end

end