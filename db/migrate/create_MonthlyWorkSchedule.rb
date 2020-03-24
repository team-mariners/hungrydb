# frozen_string_literal: true

class CreateMonthlyWorkSchedule < ActiveRecord::Migration[6.0]
    def up

      # Create an auto-incremented id for mws
      execute "CREATE SEQUENCE mws_id_seq
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1;"
      
      execute "CREATE TABLE monthly_work_schedule (
        mwsid bigint NOT NULL DEFAULT nextval('mws_id_seq'),
        id bigint,
        PRIMARY KEY(mwsid),
        FOREIGN KEY(id) REFERENCES full_time_riders
          ON DELETE CASCADE,
      );"
  
    end
  
    # For rolling back
    def down
      execute "DROP TABLE monthly_work_schedule;"
    end
  end