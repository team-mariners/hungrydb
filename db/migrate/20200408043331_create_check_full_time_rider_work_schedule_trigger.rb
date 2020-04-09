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
      BEGIN
        -- Insert or update of working interval (new record)
        IF ((TG_OP = 'INSERT') OR (TG_OP = 'UPDATE')) THEN          
          id = NEW.wws_id;                      
          schedule_type = (SELECT w_type FROM weekly_work_schedules WHERE wws_id = NEW.wws_id);
        END IF;

        -- Delete or update of wws_id of working interval (old record)
        IF ((TG_OP = 'DELETE') OR (TG_OP = 'UPDATE')) THEN
          IF id IS NULL OR id <> OLD.wws_id THEN
            id2 = OLD.wws_id;            
            schedule_type2 = (SELECT w_type FROM weekly_work_schedules WHERE wws_id = OLD.wws_id);
          END IF;
        END IF;

        -- Insert or update of monthly_work_schedule OR insert or update of working interval          
        IF id IS NOT NULL THEN
          -- Execute the check if the updated tuple is a weekly work schedule belonging to a monthly work schedule
          -- Or if it is a working interval that belongs to such weekly work schedule        
          IF (schedule_type = 'monthly_work_schedule') THEN
            violate_constraint = check_full_time_rider_work_schedule(id);
           END IF;

          IF violate_constraint THEN
            RAISE exception 'For full-time riders, each work day must consist of 8 work hours comprising of two 4-hour periods';
          END IF;
        END IF;

        -- Delete or update of wws_id of old working interval
        IF id2 IS NOT NULL THEN
          -- Check if there is still any working interval belonging to the weekly work schedule (for deletion)
          SELECT true INTO still_exists
          FROM working_interval 
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
      DROP FUNCTION check_full_time_rider_work_schedule() CASCADE;
      DROP FUNCTION check_full_time_rider_work_schedule(bigint) CASCADE;
    SQL
  end
end
