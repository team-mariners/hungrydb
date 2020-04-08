class CreateCheckConsecutiveWorkDaysTrigger < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL    
    CREATE OR REPLACE FUNCTION check_consecutive_work_days(id bigint) RETURNS boolean AS $$
    DECLARE
      violate_constraint boolean DEFAULT false;
    BEGIN
      WITH
        T AS (
          -- Select all the distinct working days in the weekly work schedule and map them to integers
          SELECT DISTINCT CASE workingDay
            WHEN 'Monday' THEN 0
            WHEN 'Tuesday' THEN 1
            WHEN 'Wednesday' THEN 2
            WHEN 'Thursday' THEN 3
            WHEN 'Friday' THEN 4
            WHEN 'Saturday' THEN 5
            WHEN 'Sunday' THEN 6
          END as dow
          FROM working_intervals
          WHERE wws_id = id
        ),
        C AS (
          SELECT COUNT(*) as num_days
          FROM T
        ),
        R AS (
          SELECT DISTINCT dow
          FROM (VALUES (0), (1), (2), (3), (4), (5), (6)) AS d (dow)
          WHERE d.dow NOT IN (SELECT dow FROM T)             
        )
      SELECT true INTO violate_constraint
      FROM C
      WHERE C.num_days <> 5
      OR NOT EXISTS (
        SELECT 1
        FROM R R1
        WHERE EXISTS (
          SELECT 1
          FROM R R2
          WHERE R2.dow <> R1.dow
          AND ((ABS(R2.dow - R1.dow) = 1) OR (R1.dow = 0 AND R2.dow = 6))
        )
      );

      RETURN violate_constraint;
    END;
    $$ LANGUAGE plpgsql;

    CREATE OR REPLACE FUNCTION check_consecutive_work_days() RETURNS TRIGGER AS $$
    DECLARE
      schedule_type wws_type;
      schedule_type2 wws_type;
      id bigint;
      id2 bigint;
      is_working_intervals boolean DEFAULT false;
      still_exists boolean;      
      violate_constraint boolean DEFAULT false;
    BEGIN
      -- Guard clause              
      IF (TG_TABLE_NAME = 'weekly_work_schedules') THEN
        IF (NEW.w_type <> 'monthly_work_schedule') THEN
          -- If the weekly work schedule is not belonging to a monthly work schedule
          RETURN NULL;
        END IF;
      ELSE
        is_working_intervals = true;

        IF NEW IS NOT NULL THEN
          -- Insert or update of working interval (new record)
          schedule_type = (SELECT w_type FROM weekly_work_schedules WHERE wws_id = NEW.wws_id);
        END IF;

        IF OLD IS NOT NULL THEN
          -- Delete or update of working interval (old record)  
          schedule_type2 = (SELECT w_type FROM weekly_work_schedules WHERE wws_id = OLD.wws_id);
        END IF;
      END IF;

      -- Selecting the id of weekly_work_schedule
      IF (TG_TABLE_NAME = 'weekly_work_schedules') THEN
        -- Insert or update on weekly_work_schedules                    
        id = NEW.wws_id;
      ELSE
        IF NEW IS NOT NULL THEN
          -- Insert or update of working interval (new record)
          id = NEW.wws_id;                      
        END IF;

        IF OLD IS NOT NULL THEN
          IF id IS NULL OR id <> OLD.wws_id THEN
            -- Delete or update of wws_id of working interval (old record)
            id2 = OLD.wws_id;            
          END IF;
        END IF;
      END IF;

      -- Insert or update of monthly_work_schedule OR insert or update of working interval          
      IF id IS NOT NULL THEN
        -- Execute the check if the updated tuple is a weekly work schedule belonging to a monthly work schedule
        -- Or if it is a working interval that belongs to such weekly work schedule                
        IF (NOT is_working_intervals OR (schedule_type = 'monthly_work_schedule')) THEN
          violate_constraint = check_consecutive_work_days(id);
        END IF;

        IF violate_constraint THEN
          RAISE exception 'Weekly work schedule for a full-time rider must consist of 5 consecutive work days';
        END IF;
      END IF;

      -- Delete or update of wws_id of old working interval
      IF id2 IS NOT NULL THEN
        -- Check if there is still any working intervals that belong to the weekly work schedule
        SELECT true INTO still_exists
        FROM working_intervals
        WHERE wws_id = id2;
        
        -- If the weekly work schedule still exists and it belongs to a monthly work schedule
        IF (FOUND AND (schedule_type2 = 'monthly_work_schedule')) THEN
          violate_constraint = check_consecutive_work_days(id2);
        END IF;

        IF violate_constraint THEN
          RAISE exception 'Weekly work schedule for a full-time rider must consist of 5 consecutive work days';
        END IF;
      END IF;
 
      RETURN NULL;
    END;
    $$ LANGUAGE plpgsql;

    DROP TRIGGER IF EXISTS check_consecutive_work_days_weekly_work_schedule_trigger ON weekly_work_schedules CASCADE;
    CREATE CONSTRAINT TRIGGER check_consecutive_work_days_weekly_work_schedule_trigger
      AFTER INSERT ON weekly_work_schedules
      DEFERRABLE INITIALLY DEFERRED
      FOR EACH ROW
      EXECUTE PROCEDURE check_full_time_rider_work_schedule();

    DROP TRIGGER IF EXISTS check_consecutive_work_days_working_interval_trigger ON working_intervals CASCADE;
    CREATE CONSTRAINT TRIGGER check_consecutive_work_days_trigger
      AFTER DELETE OR UPDATE OR INSERT ON working_intervals
      DEFERRABLE INITIALLY DEFERRED
      FOR EACH ROW
      EXECUTE PROCEDURE check_consecutive_work_days();
    SQL
  end

  def down    
    execute <<-SQL
      DROP TRIGGER check_consecutive_work_days_weekly_work_schedule_trigger ON weekly_work_schedules CASCADE;    
      DROP TRIGGER check_consecutive_work_days_trigger ON working_intervals CASCADE;
      DROP FUNCTION check_consecutive_work_days();
      DROP FUNCTION check_consecutive_work_days(bigint);
    SQL
  end
end
