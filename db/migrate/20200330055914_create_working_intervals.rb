# frozen_string_literal: true

class CreateWorkingIntervals < ActiveRecord::Migration[6.0]
  def up
    # Create an auto-incremented id for Working Interval
    execute "CREATE SEQUENCE wi_id_seq
      START WITH 1
      INCREMENT BY 1
      NO MINVALUE
      NO MAXVALUE
      CACHE 1;"
    
    execute "CREATE TABLE working_intervals (
      wi_id bigint NOT NULL DEFAULT nextval('wi_id_seq'),
      workingDay varchar(300) NOT NULL,
      startHour varchar(300) NOT NULL,
      endHour varchar(300) NOT NULL,
      wws_id bigint NOT NULL,
      PRIMARY KEY(wi_id),
      FOREIGN KEY(wws_id) REFERENCES weekly_work_schedules
          ON DELETE CASCADE
    );"

    # This will auto drop the sequence when Working Interval is dropped
    execute "ALTER SEQUENCE wi_id_seq OWNED BY working_intervals.wi_id;"
  end

  # For rolling back
  def down
    execute "DROP TABLE working_intervals;"
  end
end
