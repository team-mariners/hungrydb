class CreatePartTimeRiderWeeklyWorkScheduleTrigger < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL
      CREATE OR REPLACE FUNCTION check_weekly_work_schedule_exists() RETURNS TRIGGER AS $$
      DECLARE
        pt_rider_id bigint;
        ok boolean;
      BEGIN
        IF (TG_TABLE_NAME = 'part_time_riders') THEN
          pt_rider_id = NEW.id;
        ELSE 
          pt_rider_id = OLD.rider_id;
        END IF;

        SELECT true INTO ok
          FROM weekly_work_schedules
          WHERE rider_id = pt_rider_id;
        IF NOT FOUND THEN
          SELECT FALSE INTO ok
            FROM part_time_riders
            WHERE id = pt_rider_id;
          IF FOUND THEN
            RAISE EXCEPTION 'A part time rider needs to have a weekly work schedule';
          END IF;
        END IF;
      END;
      $$ LANGUAGE plpgsql;

      DROP TRIGGER IF EXISTS part_time_rider_trigger ON part_time_riders CASCADE;
      CREATE CONSTRAINT TRIGGER part_time_rider_trigger 
        AFTER INSERT ON part_time_riders
        DEFERRABLE INITIALLY DEFERRED
        FOR EACH ROW
        EXECUTE PROCEDURE check_weekly_work_schedule_exists();

      DROP TRIGGER IF EXISTS weekly_work_schedule_trigger ON weekly_work_schedules CASCADE;
      CREATE CONSTRAINT TRIGGER weekly_work_schedule_trigger
        AFTER DELETE OR UPDATE OF rider_id ON weekly_work_schedules
        DEFERRABLE INITIALLY DEFERRED
        FOR EACH ROW
        EXECUTE PROCEDURE check_weekly_work_schedule_exists();
    SQL
  end

  def down
    execute <<-SQL
      DROP TRIGGER part_time_rider_trigger ON part_time_riders CASCADE;
      DROP TRIGGER weekly_work_schedule_trigger ON weekly_work_schedules CASCADE;
      DROP FUNCTION check_weekly_schedule_exists() CASCADE;
    SQL
  end
end
