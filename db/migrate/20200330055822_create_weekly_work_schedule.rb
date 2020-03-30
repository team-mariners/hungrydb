class CreateWeeklyWorkSchedule < ActiveRecord::Migration[6.0]
  def up
    # Create an auto-incremented id for Restaurants
    execute "CREATE SEQUENCE wws_id_seq
      START WITH 1
      INCREMENT BY 1
      NO MINVALUE
      NO MAXVALUE
      CACHE 1;"
    
    execute "CREATE TABLE weekly_work_schedule (
      wws_id bigint NOT NULL DEFAULT nextval('wws_id_seq'),
      id bigint,
      mwsid bigint,
      PRIMARY KEY(wws_id),
      FOREIGN KEY(id) REFERENCES part_time_riders
          ON DELETE CASCADE,
      FOREIGN KEY(mwsid) REFERENCES monthly_work_schedule
          ON DELETE CASCADE
    );"

    # This will auto drop the sequence when Riders is dropped
    execute "ALTER SEQUENCE wws_id_seq OWNED BY weekly_work_schedule.wws_id;"
  end

  # For rolling back
  def down
    execute "DROP TABLE weekly_work_schedule;"
  end
end
