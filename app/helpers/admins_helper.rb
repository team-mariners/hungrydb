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

    def get_all_fds_promos
        promos = ActiveRecord::Base.connection.exec_query(
            "SELECT * FROM promotions
            WHERE p_type = 'fds';"
        ).to_a

        return promos
    end

    def create_fds_promo(name, code, start, enddate, percent, max)
        begin
            ActiveRecord::Base.connection.begin_db_transaction
            ActiveRecord::Base.connection.exec_query(
                "INSERT INTO Promotions(p_name, p_type, promocode, max_redeem, start_datetime, end_datetime, percentage)
                VALUES ('#{name}', 'fds', '#{code}', #{max}, '#{start}', '#{enddate}', #{percent});"
            )

            promo = ActiveRecord::Base.connection.exec_query(
                "SELECT * FROM Promotions
                WHERE promocode = '#{code}'"
            ).to_a[0]

            ActiveRecord::Base.connection.exec_query(
                "INSERT INTO fds_promotions(promotion_id, p_type)
                VALUES (#{promo['id']}, '#{promo['p_type']}');"
            )
            ActiveRecord::Base.connection.commit_db_transaction
        rescue Exception => e
            return false
        end

        return fds_promo_exist?(code)
    end

    def edit_fds_promo(code, start, enddate, percent, max)
        ActiveRecord::Base.connection.exec_query(
            "UPDATE Promotions SET
            max_redeem = #{max}, start_datetime = '#{start}',
            end_datetime = '#{enddate}', percentage = #{percent}
            WHERE promocode = '#{code}';"
        )

        promo = ActiveRecord::Base.connection.exec_query(
            "SELECT * FROM Promotions
            WHERE promocode = '#{code}';"
        ).to_a[0]

        return (promo['start_datetime'] == start && promo['end_datetime'] == enddate && promo['percentage'] == percent && promo['max_redeem'] == max)
    end

    def fds_promo_exist?(code)
        promo = ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*) FROM Promotions
            WHERE promocode = '#{code}'"
        ).first['count']

        if promo == 1
            return true
        else
            return false
        end
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
        elsif role == 'rider'
            # Creating rider should use create_rider() instead
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

    def create_rider(userid, type, salary)
        if (type != 'full_time' && type != 'part_time')
            return false
        end

        rider = ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*) FROM riders
            WHERE user_id = #{userid};"
        ).first['count']

        ActiveRecord::Base.connection.begin_db_transaction()

        # Remove all tuples from rider subclasses
        ActiveRecord::Base.connection.exec_query(
            "DELETE FROM part_time_riders
            WHERE id = '#{userid}';"
        )

        ActiveRecord::Base.connection.exec_query(
            "DELETE FROM full_time_riders
            WHERE id = '#{userid}';"
        )

        # Remove existing work schedules
        ActiveRecord::Base.connection.exec_query(
            "DELETE FROM weekly_work_schedules
            WHERE pt_rider_id = '#{userid}';"
        )

        ActiveRecord::Base.connection.exec_query(
            "DELETE FROM weekly_work_schedules
            WHERE mws_id = (SELECT mws_id FROM monthly_work_schedules WHERE rider_id = '#{userid}');"
        )

        ActiveRecord::Base.connection.exec_query(
            "DELETE FROM monthly_work_schedules
            WHERE rider_id = '#{userid}';"
        )

        # Remove existing attendance records
        ActiveRecord::Base.connection.exec_query(
            "DELETE FROM Attendance WHERE id = '#{userid}';"
        )

        # Insert new values into riders and subclasses
        if (rider == 0)
            ActiveRecord::Base.connection.exec_query(
                "INSERT INTO riders(user_id, r_type, created_at, updated_at) VALUES
                ('#{userid}', '#{type}', 'now', 'now');"
            )
        else
            ActiveRecord::Base.connection.exec_query(
                "UPDATE riders SET r_type = '#{type}'
                WHERE user_id = '#{userid}';"
            )
        end

        ActiveRecord::Base.connection.exec_query(
            "INSERT INTO #{type}_riders VALUES
            ('#{userid}', '#{type}', '#{salary}');"
        )

        # Insert new values into work schedules
        if (type == 'part_time')
            ActiveRecord::Base.connection.exec_query(
                "INSERT INTO weekly_work_schedules(w_type, pt_rider_id)
                VALUES ('part_time_rider', '#{userid}');"
            )
        else
            ActiveRecord::Base.connection.exec_query(
                "INSERT INTO monthly_work_schedules(rider_id)
                VALUES ('#{userid}');"
            )

            ActiveRecord::Base.connection.exec_query(
                "INSERT INTO weekly_work_schedules(w_type, mws_id)
                VALUES ('monthly_work_schedule', (SELECT mws_id FROM monthly_work_schedules WHERE rider_id = '#{userid}'));"
            )
        end

        # Update users table
        ActiveRecord::Base.connection.exec_query(
            "UPDATE users SET roles = 'rider'
            WHERE id = #{userid};"
        )

        ActiveRecord::Base.connection.commit_db_transaction()

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

    def get_full_time_schedule_matrix
        intervals = ActiveRecord::Base.connection.exec_query(
            "SELECT workingday, starthour, endhour, COUNT(*)
            FROM working_intervals wi JOIN weekly_work_schedules wws
            ON (wi.wws_id = wws.wws_id)
            WHERE mws_id IS NOT NULL
            GROUP BY workingday, starthour, endhour
            ORDER BY workingday, starthour;"
        )

        return get_schedule_matrix(intervals)
    end

    def get_part_time_schedule_matrix
        intervals = ActiveRecord::Base.connection.exec_query(
            "SELECT workingday, starthour, endhour, COUNT(*)
            FROM working_intervals wi JOIN weekly_work_schedules wws
            ON (wi.wws_id = wws.wws_id)
            WHERE pt_rider_id IS NOT NULL
            GROUP BY workingday, starthour, endhour
            ORDER BY workingday, starthour;"
        )

        return get_schedule_matrix(intervals)
    end

    def get_rider_schedule_matrix(userid)
        if (!user_has_role?(userid, 'rider'))
            return false
        end

        rtype = ActiveRecord::Base.connection.exec_query(
            "SELECT r_type FROM riders
            WHERE user_id = '#{userid}';"
        ).first['r_type']

        if (rtype == 'part_time')
            intervals = ActiveRecord::Base.connection.exec_query(
                "SELECT workingday, starthour, endhour, COUNT(*)
                FROM working_intervals wi JOIN weekly_work_schedules wws
                ON (wi.wws_id = wws.wws_id)
                WHERE pt_rider_id = '#{userid}'
                GROUP BY workingday, starthour, endhour
                ORDER BY workingday, starthour;"
            )
        else
            intervals = ActiveRecord::Base.connection.exec_query(
                "SELECT workingday, starthour, endhour, COUNT(*)
                FROM working_intervals wi
                JOIN weekly_work_schedules wws ON (wi.wws_id = wws.wws_id)
                JOIN monthly_work_schedules mws ON (wws.mws_id = mws.mws_id)
                WHERE rider_id = '#{userid}'
                GROUP BY workingday, starthour, endhour
                ORDER BY workingday, starthour;"
            )
        end

        return get_schedule_matrix(intervals)
    end

    def update_rider_schedule(userid, matrix)
        if (!user_has_role?(userid, 'rider'))
            return false
        end

        dow = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        rtype = ActiveRecord::Base.connection.exec_query(
            "SELECT r_type FROM riders
            WHERE user_id = '#{userid}';"
        ).first['r_type']

        if (rtype == 'part_time')
            total = 0

            for i in 0..6 do
                daily = 0

                for j in 0..11 do
                    total += matrix[i][j]
                    daily += matrix[i][j]

                    if (daily > 4)
                        return false
                    elsif (matrix[i][j] == 0)
                        daily = 0
                    end
                end
            end

            if (total < 10 || total > 48)
                return false
            end

            wwsid = ActiveRecord::Base.connection.exec_query(
                "SELECT wws_id FROM weekly_work_schedules
                WHERE pt_rider_id = '#{userid}';"
            ).first['wws_id']

            begin
                ActiveRecord::Base.connection.begin_db_transaction()
                ActiveRecord::Base.connection.exec_query(
                    "DELETE FROM working_intervals
                    WHERE wws_id = '#{wwsid}';"
                )

                for i in 0..6 do
                    started = false
                    start = nil
                    ending = nil

                    for j in 0..11 do
                        if (matrix[i][j] == 1 && !started)
                            started = true
                            start = (Time.parse('10:00') + j.hours).strftime('%R')
                        elsif (((j == 11 && matrix[i][j] == 1) || matrix[i][j + 1] == 0) && started)
                            ending = (Time.parse('10:00') + (j + 1).hours).strftime('%R')
                            ActiveRecord::Base.connection.exec_query(
                                "INSERT INTO working_intervals(workingday, starthour, endhour, wws_id) VALUES
                                ('#{dow[i]}', '#{start}', '#{ending}', '#{wwsid}');"
                            )
                            started = false
                        end
                    end
                end
                ActiveRecord::Base.connection.commit_db_transaction()
            rescue Exception => e
                return false
            end

            return true
        else
            wwsid = ActiveRecord::Base.connection.exec_query(
                "SELECT wws_id FROM weekly_work_schedules ws
                JOIN monthly_work_schedules ms ON (ws.mws_id = ms.mws_id)
                WHERE rider_id = '#{userid}';"
            ).first['wws_id']

            # Take the first interval and assume the rest accordingly
            begin
                ActiveRecord::Base.connection.begin_db_transaction()
                ActiveRecord::Base.connection.exec_query(
                    "DELETE FROM working_intervals
                    WHERE wws_id = '#{wwsid}';"
                )

                for i in 0..6 do
                    start1 = nil
                    ending1 = nil
                    start2 = nil
                    ending2 = nil
                    shouldExit = false
                    for j in 0..3
                        if (matrix[i][j] == 1 && !shouldExit)
                            start1 = (Time.parse('10:00') + j.hours).strftime('%R')
                            ending1 = (Time.parse('10:00') + (j + 4).hours).strftime('%R')
                            start2 = (Time.parse('10:00') + (j + 5).hours).strftime('%R')
                            ending2 = (Time.parse('10:00') + (j + 9).hours).strftime('%R')
                            shouldExit = true
                        end
                    end

                    if start1 != nil
                        ActiveRecord::Base.connection.exec_query(
                            "INSERT INTO working_intervals(workingday, starthour, endhour, wws_id) VALUES
                            ('#{dow[i]}', '#{start1}', '#{ending1}', '#{wwsid}'),
                            ('#{dow[i]}', '#{start2}', '#{ending2}', '#{wwsid}')"
                        )
                    end
                end
                ActiveRecord::Base.connection.commit_db_transaction()
            rescue Exception => e
                return false
            end

            return true
        end

    end

    def get_schedule_matrix(intervals)
        # A week will start from Monday to Sunday and each day is 10AM to 10PM
        matrix = Array.new(7) { Array.new(12, 0) }

        for i in 0..6 do
            for j in 0..11 do
                time = (Time.parse('11:00') + j.hours).strftime('%R')
                matrix[i][j] = get_interval_count(intervals, i, time)
            end
        end

        return matrix
    end

    def get_interval_count(intervals, day, start)
        dow = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        count = 0

        for i in 0..(intervals.length - 1) do
            if (intervals[i]['workingday'] == dow[day] && intervals[i]['starthour'] <= start && intervals[i]['endhour'] > start)
                count += intervals[i]['count']
            end
        end

        return count
    end

    def get_site_statistics(yearmonth)
        parts = yearmonth.split("-")
        if parts.length != 2
            return false
        end

        year = parts[0]
        month = parts[1]

        newCustomers = ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*) FROM users
            WHERE roles = 'customer'
            AND date_part('year', updated_at) = '#{year}'
            AND date_part('month', updated_at) = '#{month}';"
        ).first['count']

        numOrders = ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*) FROM orders
            WHERE status = 'complete'
            AND date_part('year', date_time) = '#{year}'
            AND date_part('month', date_time) = '#{month}';"
        ).first['count']

        costOrders = ActiveRecord::Base.connection.exec_query(
            "SELECT COALESCE(SUM(total_price), 0) FROM orders
            WHERE status = 'complete'
            AND date_part('year', date_time) = '#{year}'
            AND date_part('month', date_time) = '#{month}';"
        ).first['coalesce']

        output = {
            newCustomers: newCustomers,
            numOrders: numOrders,
            costOrders: costOrders
        }

        return output
    end

    def get_delivery_statistics(yearmonth)
        parts = yearmonth.split("-")
        if parts.length != 2
            return false
        end

        year = parts[0]
        month = parts[1]

        numOrders = ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*) FROM delivers
            WHERE order_delivered_time IS NOT NULL
            AND date_part('year', order_time) = '#{year}'
            AND date_part('month', order_time) = '#{month}';"
        ).first['count']

        numHours = ActiveRecord::Base.connection.exec_query(
            "SELECT COALESCE(SUM(total_hours), 0) FROM attendance
            WHERE date_part('year', w_date) = '#{year}'
            AND date_part('month', w_date) = '#{month}';"
        ).first['coalesce']

        numSalary = ActiveRecord::Base.connection.exec_query(
            "SELECT COALESCE(SUM(base_salary + commission), 0) AS salary FROM rider_salaries
            WHERE date_part('year', start_date) = '#{year}'
            AND date_part('month', start_date) = '#{month}';"
        ).first['salary']

        avgDelivery = ActiveRecord::Base.connection.exec_query(
            "SELECT AVG(order_delivered_time - order_time) FROM delivers
            WHERE order_delivered_time IS NOT NULL
            AND date_part('year', order_time) = '#{year}'
            AND date_part('month', order_time) = '#{month}';"
        ).first['avg']

        numRatings = ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(rider_rating) FROM reviews rev
            JOIN orders ord ON (ord.oid = rev.oid)
            WHERE date_part('year', date_time) = '#{year}'
            AND date_part('month', date_time) = '#{month}';"
        ).first['count']

        avgRating = ActiveRecord::Base.connection.exec_query(
            "SELECT COALESCE(AVG(rider_rating), 0) FROM reviews rev
            JOIN orders ord ON (ord.oid = rev.oid)
            WHERE date_part('year', date_time) = '#{year}'
            AND date_part('month', date_time) = '#{month}';"
        ).first['coalesce']

        output = {
            numOrders: numOrders,
            numHours: numHours,
            numSalary: numSalary,
            avgDelivery: avgDelivery,
            numRatings: numRatings,
            avgRating: avgRating
        }

        return output
    end

    def get_delivery_statistics_for_rider(userid, yearmonth)
        parts = yearmonth.split("-")
        if parts.length != 2
            return false
        end

        year = parts[0]
        month = parts[1]

        numOrders = ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*) FROM delivers
            WHERE order_delivered_time IS NOT NULL
            AND rider_id = '#{userid}'
            AND date_part('year', order_time) = '#{year}'
            AND date_part('month', order_time) = '#{month}';"
        ).first['count']

        numHours = ActiveRecord::Base.connection.exec_query(
            "SELECT COALESCE(SUM(total_hours), 0) FROM attendance
            WHERE id = '#{userid}'
            AND date_part('year', w_date) = '#{year}'
            AND date_part('month', w_date) = '#{month}';"
        ).first['coalesce']

        numSalary = ActiveRecord::Base.connection.exec_query(
            "SELECT COALESCE(SUM(base_salary + commission), 0) AS salary FROM rider_salaries
            WHERE rider_id = '#{userid}'
            AND date_part('year', start_date) = '#{year}'
            AND date_part('month', start_date) = '#{month}';"
        ).first['salary']

        avgDelivery = ActiveRecord::Base.connection.exec_query(
            "SELECT AVG(order_delivered_time - order_time) FROM delivers
            WHERE rider_id = '#{userid}'
            AND order_delivered_time IS NOT NULL
            AND date_part('year', order_time) = '#{year}'
            AND date_part('month', order_time) = '#{month}';"
        ).first['avg']

        numRatings = ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(rider_rating) FROM reviews rev
            JOIN orders ord ON (ord.oid = rev.oid)
            WHERE rider_id = '#{userid}'
            AND date_part('year', date_time) = '#{year}'
            AND date_part('month', date_time) = '#{month}';"
        ).first['count']

        avgRating = ActiveRecord::Base.connection.exec_query(
            "SELECT COALESCE(AVG(rider_rating), 0) FROM reviews rev
            JOIN orders ord ON (ord.oid = rev.oid)
            WHERE rider_id = '#{userid}'
            AND date_part('year', date_time) = '#{year}'
            AND date_part('month', date_time) = '#{month}';"
        ).first['coalesce']

        output = {
            numOrders: numOrders,
            numHours: numHours,
            numSalary: numSalary,
            avgDelivery: avgDelivery,
            numRatings: numRatings,
            avgRating: avgRating
        }

        return output
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
