class RidersController < UsersController    
    def index
    end

    def check_clocked_in        
      result = get_clocked_in_data
      render json: result
    end

    def clock_in   
      result = nil;
        
      ActiveRecord::Base.connection.begin_db_transaction    
      ActiveRecord::Base.connection.exec_query(
        "INSERT INTO attendance(id, w_date, clock_in)
        VALUES(#{current_user["id"]}, CURRENT_DATE, CURRENT_TIME);"      
      )
    
      result = get_clocked_in_data
      ActiveRecord::Base.connection.commit_db_transaction
    
      render json: result
    end

    def clock_out
      result = nil

      ActiveRecord::Base.connection.begin_db_transaction          
      # The common table expression calculates the total hours the rider worked so far today by summing up 
      # all the work intervals at the current day which the start_time is AFTER OR EQUAL to the clock in time       
      # and the endTime is BEFORE OR EQUAL to the clock out time. 
      # After that, assign the total number of hours worked to the corresponding attendance entry.
      ActiveRecord::Base.connection.exec_query(        
        "WITH T AS (
          SELECT SUM(date_part('hour', endHour - startHour)) as totalHours
          FROM working_intervals
          WHERE workingDay::text = trim(to_char(CURRENT_TIMESTAMP, 'Day'))
          AND startHour >= (
            SELECT clock_in 
            FROM attendance 
            WHERE id =#{current_user["id"]} AND w_date = CURRENT_DATE)
          AND endHour <= CURRENT_TIME
          AND wws_id = (
            SELECT CASE (SELECT r_type FROM Riders WHERE user_id=#{current_user["id"]})
              WHEN 'full_time' THEN (
                SELECT wws_id
                FROM weekly_work_schedules
                WHERE w_type = 'monthly_work_schedule'
                AND mws_id = (
                  SELECT mws_id
                  FROM monthly_work_schedules
                  WHERE rider_id = #{current_user["id"]}
                )
              )
              WHEN 'part_time' THEN (
                SELECT wws_id
                FROM weekly_work_schedules
                WHERE w_type = 'part_time_rider'
                AND pt_rider_id = #{current_user["id"]}
              )
              END AS id                    
          )
        )
        UPDATE attendance
        SET clock_out = CURRENT_TIME, total_hours = COALESCE((SELECT totalHours FROM T), 0)
        WHERE id=#{current_user["id"]}
        AND w_date = CURRENT_DATE;"
      )

      intervals = ActiveRecord::Base.connection.exec_query(
        "SELECT *
        FROM working_intervals
        WHERE workingDay::text = trim(to_char(CURRENT_TIMESTAMP, 'Day'))
        AND wws_id = (
          SELECT CASE (SELECT r_type FROM Riders WHERE user_id=3)
            WHEN 'full_time' THEN (
              SELECT wws_id
              FROM weekly_work_schedules
              WHERE w_type = 'monthly_work_schedule'
              AND mws_id = (
                SELECT mws_id
                FROM monthly_work_schedules
                WHERE rider_id = 3
              )
            )
            WHEN 'part_time' THEN (
              SELECT wws_id
              FROM weekly_work_schedules
              WHERE w_type = 'part_time_rider'
              AND pt_rider_id = 3
            )
            END AS id                    
        );"
      )

      result = get_clocked_in_data
      ActiveRecord::Base.connection.commit_db_transaction

      render json: result
    end

    def get_clocked_in_data
      ActiveRecord::Base.connection.exec_query(
        "SELECT *
        FROM attendance
        WHERE id = #{current_user["id"]}
        AND w_date = CURRENT_DATE;"
      ).to_a[0]
    end
end