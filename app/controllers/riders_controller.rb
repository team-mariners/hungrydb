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
      ActiveRecord::Base.connection.exec_query(        
        "UPDATE attendance
        SET clock_out = CURRENT_TIME
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

    def get_deliveries
      deliveries = ActiveRecord::Base.connection.exec_query(
        "SELECT *
        FROM Delivers
        WHERE rider_id = #{current_user["id"]}"
      ).to_a
      render json: deliveries
    end

    private

    def get_clocked_in_data
      ActiveRecord::Base.connection.exec_query(
        "SELECT *
        FROM attendance
        WHERE id = #{current_user["id"]}
        AND w_date = CURRENT_DATE;"
      ).to_a[0]
    end
end