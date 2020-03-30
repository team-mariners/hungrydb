class CreateFullTimeRiderMonthlyScheduleTrigger < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL
      CREATE OR REPLACE FUNCTION check_monthly_schedule_exists() RETURNS TRIGGER AS $$
      DECLARE         
        ft_rider_id bigint;               
        ok boolean;     
      BEGIN
        IF (TG_TABLE_NAME = 'full_time_riders') THEN
          -- Insert or update of full_time_riders
          ft_rider_id = NEW.id;
        ELSE
          -- Table is 'monthly_work_schedules'
          -- Deletion or update of monthly_work_schedules
          ft_rider_id = OLD.rider_id;
        END IF;
        
        SELECT true INTO ok
          FROM monthly_work_schedules M
          WHERE M.rider_id = ft_rider_id;
        IF NOT FOUND THEN
          SELECT false INTO ok
            FROM full_time_riders
            WHERE id = ft_rider_id;
          IF FOUND THEN
            RAISE EXCEPTION 'A full time rider must have a monthly work schedule';
          END IF;
        END IF;
        RETURN NULL;
      END;
      $$ LANGUAGE plpgsql;

      -- Insert or update of full_time_riders
      DROP TRIGGER IF EXISTS full_time_rider_trigger ON full_time_riders CASCADE;
      CREATE CONSTRAINT TRIGGER full_time_rider_trigger
        AFTER UPDATE OF id OR INSERT ON full_time_riders
        DEFERRABLE INITIALLY DEFERRED
        FOR EACH ROW
        EXECUTE PROCEDURE check_monthly_schedule_exists();

      -- Deletion or update of monthly_work_schedules
      DROP TRIGGER IF EXISTS monthly_work_schedule_trigger ON monthly_work_schedules CASCADE;
      CREATE CONSTRAINT TRIGGER monthly_work_schedule_trigger
        AFTER DELETE OR UPDATE OF rider_id ON monthly_work_schedules
        DEFERRABLE INITIALLY DEFERRED
        FOR EACH ROW
        EXECUTE PROCEDURE check_monthly_schedule_exists();      
    SQL
  end

  def down
    execute <<-SQL    
      DROP TRIGGER full_time_rider_trigger ON full_time_riders CASCADE;
      DROP TRIGGER monthly_work_schedule_trigger ON monthly_work_schedules CASCADE;
      DROP FUNCTION check_monthly_schedule_exists() CASCADE;
    SQL
  end
end
