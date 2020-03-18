# frozen_string_literal: true

class CreatePromotionsTrigger < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL
      CREATE OR REPLACE FUNCTION check_promotions_constraint() RETURNS TRIGGER AS $$    
      BEGIN
        IF NOT (
          EXISTS (SELECT 1 FROM fds_promotions WHERE promotion_id = NEW.id)
          OR EXISTS (SELECT 1 FROM restaurant_promotions WHERE promotion_id = NEW.id)
        ) THEN
          RAISE EXCEPTION 'Must insert a tuple into the corresponding subtable of promotions';
        END IF;
        RETURN NULL;
      END;
      $$ LANGUAGE plpgsql;

      DROP TRIGGER IF EXISTS promotion_trigger ON promotions CASCADE;
      CREATE CONSTRAINT TRIGGER promotion_trigger
        AFTER UPDATE OR INSERT ON promotions
        DEFERRABLE INITIALLY DEFERRED
        FOR EACH ROW 
        EXECUTE PROCEDURE check_promotions_constraint();
    SQL
  end

  def down
    execute <<-SQL
      DROP TRIGGER promotion_trigger ON promotions CASCADE;
      DROP FUNCTION check_promotions_constraint() CASCADE;
    SQL
  end
end
