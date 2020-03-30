class CreateMonthlyWorkSchedule < ActiveRecord::Migration[6.0]
  def up
    # Create an auto-incremented id for mws
    execute "CREATE SEQUENCE mws_id_seq
      START WITH 1
      INCREMENT BY 1
      NO MINVALUE
      NO MAXVALUE
      CACHE 1;"
    
    execute "CREATE TABLE monthly_work_schedules (
      mws_id bigint NOT NULL DEFAULT nextval('mws_id_seq'),
      rider_id bigint,
      PRIMARY KEY(mws_id),
      FOREIGN KEY(rider_id) REFERENCES full_time_riders
        ON DELETE CASCADE
    );"

    execute "ALTER SEQUENCE mws_id_seq OWNED BY monthly_work_schedules.mws_id;"
  end

  # For rolling back
  def down
    execute "DROP TABLE monthly_work_schedules;"
  end
end
