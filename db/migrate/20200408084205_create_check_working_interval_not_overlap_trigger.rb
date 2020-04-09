class CreateCheckWorkingIntervalNotOverlapTrigger < ActiveRecord::Migration[6.0]
  def up     
    execute <<-SQL
    CREATE OR REPLACE FUNCTION check_working_inteval_not_overlap() RETURNS TRIGGER AS $$
    DECLARE
      violate_constraint boolean;           
    BEGIN
      SELECT true INTO violate_constraint
      FROM working_intervals
      WHERE wws_id = NEW.wws_id
      AND workingDay = NEW.workingDay
      AND (((NEW.startHour > startHour) AND (NEW.startHour < endHour))
        OR ((startHour > NEW.startHour) AND (startHour < NEW.endHour)));

      IF FOUND THEN
        RAISE exception 'Working intervals cannot overlap with each other';
      END IF;

      RETURN NULL;
    END;
    $$ LANGUAGE plpgsql;

    DROP TRIGGER IF EXISTS check_working_interval_not_overlap_trigger ON working_intervals CASCADE;
    CREATE TRIGGER check_working_interval_not_overlap_trigger
      AFTER UPDATE OR INSERT ON working_intervals
      FOR EACH ROW
      EXECUTE PROCEDURE check_working_inteval_not_overlap();
    SQL
  end

  def down
    execute <<-SQL
      DROP TRIGGER check_working_interval_not_overlap_trigger CASCADE;
      DROP FUNCTION check_working_interval_not_overlap() CASCADE;
    SQL
  end
end
