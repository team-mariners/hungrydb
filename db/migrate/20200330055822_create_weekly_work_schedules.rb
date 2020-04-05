# frozen_string_literal: true

class CreateWeeklyWorkSchedules < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL
      CREATE TYPE wws_type AS ENUM ('part_time_rider', 'monthly_work_schedule'); 
      
      CREATE SEQUENCE wws_id_seq
      START WITH 1
      INCREMENT BY 1
      NO MINVALUE
      NO MAXVALUE
      CACHE 1;

      CREATE TABLE weekly_work_schedules (            
        wws_id bigint PRIMARY KEY DEFAULT nextval('wws_id_seq'),
        w_type wws_type NOT NULL,
        pt_rider_id bigint REFERENCES part_time_riders ON DELETE CASCADE
          CONSTRAINT wws_pt_rider_id 
          CHECK(((w_type <> 'part_time_rider') AND (pt_rider_id IS NULL))
            OR ((w_type = 'part_time_rider') AND (pt_rider_id IS NOT NULL))
          ),        
        mws_id bigint REFERENCES monthly_work_schedules ON DELETE CASCADE               
          CONSTRAINT wws_mws_id
          CHECK(((w_type <> 'monthly_work_schedule') AND (mws_id IS NULL))
            OR ((w_type = 'monthly_work_schedule') AND (mws_id IS NOT NULL))
          )
      );

      ALTER SEQUENCE wws_id_seq OWNED BY weekly_work_schedules.wws_id;
    SQL
  end

  # For rolling back
  def down
    execute "DROP TABLE weekly_work_schedules;"
  end
end
