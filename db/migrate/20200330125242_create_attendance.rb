class CreateAttendance < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL
      CREATE TABLE attendance (
        id bigint NOT NULL,
        w_date timestamp NOT NULL,
        clock_in timestamp NOT NULL,
        clock_out timestamp, -- maybe null cuz rider may forget to clock out
        total_hours int,
        PRIMARY KEY(id, w_date),
        FOREIGN KEY(id) REFERENCES Riders(user_id)        
      )
    SQL
  end

  def down
    execute <<-SQL
      DROP TABLE attendance    
    SQL
  end
end
