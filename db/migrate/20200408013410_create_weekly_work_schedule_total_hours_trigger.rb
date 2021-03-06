class CreateWeeklyWorkScheduleTotalHoursTrigger < ActiveRecord::Migration[6.0]
  # Check if the total number of hours in each weekly work schedule is at least 10 and at most 48
  # Note that empty weekly work schedule is allowed, i.e. the weekly work schedule has no working intervals
  # for the flexibility of creating rider.
  def up
    execute <<-SQL
      CREATE OR REPLACE FUNCTION check_weekly_work_schedule_duration() RETURNS TRIGGER AS $$
      DECLARE
        id bigint;
        id2 bigint;
        total_hours interval;
        still_exists boolean;         
      BEGIN
        -- Insert or update of working interval (new record)      
        IF ((TG_OP = 'INSERT') OR (TG_OP = 'UPDATE')) THEN          
          id = NEW.wws_id;                      
        END IF;

        -- Delete or update of wws_id of working interval (old record)        
        IF ((TG_OP = 'DELETE') OR (TG_OP = 'UPDATE')) THEN
          IF id IS NULL OR id <> OLD.wws_id THEN
            id2 = OLD.wws_id;            
          END IF;
        END IF;

        -- Check if the constraint is fullfilled
        -- Insert or update on weekly_work_schedules OR Insert or update of working interval (new record)
        IF id IS NOT NULL THEN
          SELECT SUM(endHour - startHour) INTO total_hours
          FROM working_intervals
          WHERE wws_id = id;

          IF total_hours IS NULL OR total_hours < interval '10 hours' OR total_hours > interval '48 hours' THEN
            RAISE exception 'Total number of hours in each weekly work schedule must be at least 10 and at most 48';
          END IF;
        END IF;
        
        -- Delete or update of wws_id of old working interval
        IF id2 IS NOT NULL THEN
          -- Check if there is still any working interval belonging to the weekly work schedule (for deletion)
          SELECT true INTO still_exists
          FROM working_intervals 
          WHERE wws_id = id2;
          
          IF FOUND THEN
            SELECT SUM(endHour - startHour) INTO total_hours
            FROM working_intervals
            WHERE wws_id = id2;

            IF total_hours IS NULL OR total_hours < interval '10 hours' OR total_hours > interval '48 hours' THEN
              RAISE exception 'Total number of hours in each weekly work schedule must be at least 10 and at most 48';
            END IF;
          END IF;
        END IF;
        RETURN NULL;
      END;
      $$ LANGUAGE plpgsql;

      DROP TRIGGER IF EXISTS working_interval_total_hours_trigger ON working_intervals CASCADE;
      CREATE CONSTRAINT TRIGGER working_interval_total_hours_trigger
        AFTER DELETE OR UPDATE OR INSERT ON working_intervals
        DEFERRABLE INITIALLY DEFERRED
        FOR EACH ROW EXECUTE PROCEDURE check_weekly_work_schedule_duration();
    SQL
  end

  def down
    execute <<-SQL
      DROP TRIGGER working_interval_total_hours_trigger ON working_intervals CASCADE;
      DROP FUNCTION check_weekly_work_schedule_duration();
    SQL
  end
end
