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