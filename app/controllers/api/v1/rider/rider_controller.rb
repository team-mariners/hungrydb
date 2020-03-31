class Api::V1::Riders::RiderController < Api::V1::BaseController
  def clock_in        
    result = nil;
    
    ActiveRecord::Base.connection.begin_db_transaction    
    ActiveRecord::Base.connection.exec_query(
      "INSERT INTO attendance(id, w_date, clock_in)
      VALUES(#{current_user["id"]}, CURRENT_DATE, CURRENT_TIME);"      
    )

    result = ActiveRecord::Base.connection.exec_query(
      "SELECT w_date, clock_in
      FROM attendance
      WHERE id = #{current_user["id"]}
      AND w_date = CURRENT_DATE;"
    )
    ActiveRecord::Base.connection.commit_db_transaction

    render json: result
  end
end