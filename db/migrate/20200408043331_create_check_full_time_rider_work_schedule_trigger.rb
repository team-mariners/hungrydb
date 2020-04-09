class CreateCheckFullTimeRiderWorkScheduleTrigger < ActiveRecord::Migration[6.0]
  # For full-time riders, check if each work day consist of 8 work hours
  # comprising of two 4-hour periods with an hour break in between
  def up
    execute <<-SQL
      CREATE OR REPLACE FUNCTION check_full_time_rider_work_schedule(id bigint) RETURNS boolean AS $$
      DECLARE
        violate_constraint boolean DEFAULT false;
      BEGIN
        -- Check if for full time rider's weekly schedule, all working intervals of the same day have
        -- exactly 2 working intervals, with the sum of their duration being exactly 8 hours
        -- (this in turns also checks if each of the working interval are exactly 4 hours)
        -- In the following query, the negation of the above condition is checked
        -- to find violating weekly work schedule.
        SELECT true INTO violate_constraint
        FROM working_intervals
        WHERE wws_id = id
        GROUP BY workingDay
        HAVING ((COUNT(*) <> 2) OR (SUM(endHour - startHour) <> interval '8 hours'));

        RETURN violate_constraint;
      END;
      $$ LANGUAGE plpgsql;

      CREATE OR REPLACE FUNCTION check_full_time_rider_work_schedule() RETURNS TRIGGER AS $$
      DECLARE
        schedule_type wws_type;
        schedule_type2 wws_type;
        id bigint;
        id2 bigint;
        still_exists boolean;
        violate_constraint boolean DEFAULT false;
        is_working_intervals boolean DEFAULT false;
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
          IF (NOT is_working_intervals OR schedule_type = 'monthly_work_schedule') THEN
            violate_constraint = check_full_time_rider_work_schedule(id);
           END IF;

          IF violate_constraint THEN
            RAISE exception 'For full-time riders, each work day must consist of 8 work hours comprising of two 4-hour periods';
          END IF;
        END IF;

        -- Delete or update of wws_id of old working interval
        IF id2 IS NOT NULL THEN
          -- Check if the working interval still exists (for deletion)
          SELECT true INTO still_exists
          FROM weekly_work_schedules
          WHERE wws_id = id2;
          
          -- If the weekly work schedule still exists and it belongs to a monthly work schedule
          IF (FOUND AND (schedule_type2 = 'monthly_work_schedule')) THEN
            violate_constraint = check_full_time_rider_work_schedule(id2);
         END IF;

          IF violate_constraint THEN
            RAISE exception 'For full-time riders, each work day must consist of 8 work hours comprising of two 4-hour periods';
          END IF;
        END IF;
                
        RETURN NULL;
      END;
      $$ LANGUAGE plpgsql;

      DROP TRIGGER IF EXISTS check_full_time_rider_weekly_work_schedule_trigger ON weekly_work_schedules CASCADE;
      CREATE CONSTRAINT TRIGGER check_full_time_rider_weekly_work_schedule_trigger
        AFTER INSERT ON weekly_work_schedules
        DEFERRABLE INITIALLY DEFERRED
        FOR EACH ROW
        EXECUTE PROCEDURE check_full_time_rider_work_schedule();

      DROP TRIGGER IF EXISTS check_full_time_rider_working_interval_trigger ON working_intervals CASCADE;
      CREATE CONSTRAINT TRIGGER check_full_time_rider_working_interval_trigger
        AFTER DELETE OR UPDATE OR INSERT ON working_intervals
        DEFERRABLE INITIALLY DEFERRED
        FOR EACH ROW
        EXECUTE PROCEDURE check_full_time_rider_work_schedule();
    SQL
  end

  def down
    execute <<-SQL
      DROP TRIGGER check_full_time_rider_working_interval_trigger ON working_intervals CASCADE;
      DROP TRIGGER check_full_time_rider_weekly_work_schedule_trigger ON weekly_work_schedules CASCADE;
      DROP FUNCTION check_full_time_rider_work_schedule() CASCADE;
      DROP FUNCTION check_full_time_rider_work_schedule(bigint) CASCADE;
    SQL
  end
end
