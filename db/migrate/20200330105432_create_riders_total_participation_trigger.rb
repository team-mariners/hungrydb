# frozen_string_literal: true

class CreateRidersTotalParticipationTrigger < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL
      CREATE OR REPLACE FUNCTION check_rider_subclass_exist() RETURNS TRIGGER AS $$
      DECLARE
        id_retrieved bigint;
        r_type_retrieved rider_type;
        ok boolean;
        flag int;
      BEGIN
        IF (TG_TABLE_NAME = 'riders') THEN
          id_retrieved = NEW.user_id;
          r_type_retrieved = NEW.r_type;
        ELSE
          -- Either full_time_riders or part_time_riders
          id_retrieved = OLD.id;
          r_type_retrieved = OLD.r_type;
        END IF;

        raise notice 'id: %', id_retrieved;
        raise notice 'r_type: %', r_type_retrieved;

        -- Check if there is a tuple in the subclasses of riders
        IF r_type_retrieved = 'full_time' THEN
          SELECT true INTO ok
            FROM full_time_riders
            WHERE id = id_retrieved;
        ELSE
          SELECT true INTO ok
            FROM part_time_riders
            WHERE id = id_retrieved;
        END IF;

        -- Check whether there is still a tuple in riders
        IF NOT FOUND THEN
          SELECT true INTO ok
            FROM riders
            WHERE user_id = id_retrieved;
          
          IF FOUND THEN
            RAISE EXCEPTION 'A rider must have an entry in either full_timer_riders or part_time_riders';
          END IF;
        END IF;
        RETURN NULL;
      END;
      $$ LANGUAGE plpgsql;

      DROP TRIGGER IF EXISTS riders_total_participation_trigger_on_riders ON riders CASCADE;
      CREATE CONSTRAINT TRIGGER riders_total_participation_trigger_on_riders
        AFTER UPDATE OF user_id, r_type OR INSERT ON riders
        DEFERRABLE INITIALLY DEFERRED
        FOR EACH ROW
        EXECUTE PROCEDURE check_rider_subclass_exist();      

      DROP TRIGGER IF EXISTS riders_total_participation_trigger_on_full_time_riders ON full_timer_riders CASCADE;
      CREATE CONSTRAINT TRIGGER riders_total_participation_trigger_on_full_time_riders
        AFTER UPDATE OF id, r_type OR DELETE ON full_time_riders
        DEFERRABLE INITIALLY DEFERRED
        FOR EACH ROW
        EXECUTE PROCEDURE check_rider_subclass_exist();      
       
      DROP TRIGGER IF EXISTS riders_total_participation_trigger_on_part_time_riders ON part_timer_riders CASCADE;
      CREATE CONSTRAINT TRIGGER riders_total_participation_trigger_on_part_time_riders
        AFTER UPDATE OF id, r_type OR DELETE ON part_time_riders
        DEFERRABLE INITIALLY DEFERRED
        FOR EACH ROW
        EXECUTE PROCEDURE check_rider_subclass_exist();          
    SQL
  end

  def down
    execute <<-SQL
      DROP TRIGGER riders_total_participation_trigger_on_part_time_riders ON part_timer_riders CASCADE; 
      DROP TRIGGER riders_total_participation_trigger_on_full_time_riders ON full_timer_riders CASCADE;
      DROP TRIGGER riders_total_participation_trigger_on_riders ON riders CASCADE;
      DROP FUNCTION check_rider_subclass_exist() CASCADE;
    SQL
  end
end
