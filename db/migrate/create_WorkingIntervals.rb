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
        wid bigint NOT NULL DEFAULT nextval('wi_id_seq'),
        workingDay varchar(300) NOT NULL,
        startHour varchar(300) NOT NULL,
        endHour varchar(300) NOT NULL,
        wwsid bigint,
        PRIMARY KEY(wid),
        FOREIGN KEY(wwsid) REFERENCES weekly_work_schedule
            ON DELETE CASCADE
      );"
  
      # This will auto drop the sequence when Working Interval is dropped
      execute "ALTER SEQUENCE wi_id_seq OWNED BY working_intervals.wid;"
    end
  
    # For rolling back
    def down
      execute "DROP TABLE working_intervals;"
    end
  end