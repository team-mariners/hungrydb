class CreateWeeklyWorkScheduleTotalHoursTrigger < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL
      CREATE OR REPLACE FUNCTION check_weekly_work_schedule_duration() RETURNS TRIGGER AS $$
      DECLARE
        id bigint;
        id2 bigint;
        total_hours interval;
        still_exists boolean;         
      BEGIN
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
          -- Check if the working interval still exists (for deletion)
          SELECT true INTO still_exists
          FROM weekly_work_schedules
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

      DROP TRIGGER IF EXISTS weekly_work_schedule_total_hours_trigger ON weekly_work_schedules CASCADE;
      CREATE CONSTRAINT TRIGGER weekly_work_schedule_total_hours_trigger
        AFTER INSERT ON weekly_work_schedules
        DEFERRABLE INITIALLY DEFERRED
        FOR EACH ROW EXECUTE PROCEDURE check_weekly_work_schedule_duration();

      DROP TRIGGER IF EXISTS working_interval_total_hours_trigger ON working_intervals CASCADE;
      CREATE CONSTRAINT TRIGGER working_interval_total_hours_trigger
        AFTER DELETE OR UPDATE OR INSERT ON working_intervals
        DEFERRABLE INITIALLY DEFERRED
        FOR EACH ROW EXECUTE PROCEDURE check_weekly_work_schedule_duration();
    SQL
  end

  def down
    execute <<-SQL
      DROP TRIGGER weekly_work_schedule_total_hours_trigger ON weekly_work_schedules CASCADE;
      DROP TRIGGER working_interval_total_hours_trigger ON working_intervals CASCADE;
      DROP FUNCTION check_weekly_work_schedule_duration();
    SQL
  end
end
