class CreateCheckOneHourBreakTrigger < ActiveRecord::Migration[6.0]
  # Check if there exist a 1 hour interval between 2 consecutive working intervals
  def up
    execute <<-SQL
      -- record: a tuple from the working_intervalss table
      -- Returns true if there does not exist a 1 hour interval between 2 consecutive working intervals 
      -- , where the working intervals are of the same day and same schedule as the given record.
      CREATE OR REPLACE FUNCTION check_one_hour_break(record working_intervals) RETURNS BOOLEAN AS $$
        DECLARE
        is_violating BOOLEAN DEFAULT false;
        BEGIN
          WITH T as (
            SELECT *
            FROM working_intervals W
            WHERE wws_id = record.wws_id
            AND workingDay = record.workingDay
          )
          SELECT DISTINCT true INTO is_violating
          FROM T T1
          WHERE EXISTS (
            -- Select the next consecutive working interval after T1
            SELECT 1
            FROM T T2
            WHERE T2.startHour >= T1.endHour
            AND NOT EXISTS (
              -- Check whether T1 working interval is consecutive with T2 working interval
              -- i.e. no other working intervals are between T1 and T2
              SELECT 1
              FROM T T3
              WHERE T3.startHour >= T1.endHour              
              AND T3.endHour <= T2.startHour
              AND T3.startHour <> T2.startHour
            )
            AND T2.startHour - T1.endHour <> interval '1 hour'
          );
          
          RETURN is_violating;
        END;
      $$ LANGUAGE plpgsql;

      -- Function to be used by the trigger 
      CREATE OR REPLACE FUNCTION check_one_hour_break() RETURNS TRIGGER AS $$
      DECLARE
      id bigint;
      id2 bigint;
      is_violating boolean;
      still_exists boolean;
      BEGIN
        -- Insert or update of working interval (new record)
        IF ((TG_OP = 'INSERT') OR (TG_OP = 'UPDATE')) THEN
          id = NEW.wi_id;
        END IF;

        -- Delete or update of working interval (old record)
        IF ((TG_OP = 'DELETE') OR (TG_OP = 'UPDATE')) THEN
          id2 = NEW.wi_id;
        END IF;

        -- Insert or update of working interval (new record)
        IF id IS NOT NULL THEN
          is_violating = check_one_hour_break(NEW);

          IF is_violating THEN
            RAISE exception 'There must be an exact 1 hour break between consecutive working intervals';
          END IF;
        END IF;
        
        -- Delete or update of working interval (old record)
        IF id2 IS NOT NULL THEN
          -- Check if there is at least one working interval which belongs to the same schedule as the OLD tuple          
          SELECT DISTINCT true INTO still_exists
          FROM working_intervals
          WHERE wws_id = OLD.wws_id;

          IF FOUND THEN
            is_violating = check_one_hour_break(OLD);
          END IF;

          IF is_violating THEN
            RAISE exception 'There must be an exact 1 hour break between consecutive working intervals';
          END IF;
        END IF;

        RETURN NULL;
      END;
      $$ LANGUAGE plpgsql;
      
      DROP TRIGGER IF EXISTS check_one_hour_break_trigger ON working_intervals CASCADE;
      CREATE TRIGGER check_one_hour_break_trigger
        AFTER DELETE OR UPDATE OR INSERT ON working_intervals
        FOR EACH ROW
        EXECUTE PROCEDURE check_one_hour_break();
    SQL
  end

  def down
    execute <<-SQL
      DROP TRIGGER check_one_hour_break_trigger;
      DROP FUNCTION check_one_hour_break();
      DROP FUNCTION check_one_hour_break(working_intervals);
    SQL
  end
end
