# frozen_string_literal: true

class CreateOrdersDeliversTrigger < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL
      CREATE OR REPLACE FUNCTION orders_delivers_total_participation() RETURNS TRIGGER AS $$
      BEGIN
        IF NOT (
          EXISTS (SELECT 1
                  FROM Delivers D
                  WHERE D.oid = NEW.oid)
        ) THEN
          RAISE EXCEPTION 'Must insert a tuple for current Order into Delivers table';
        END IF;
        RETURN NULL;
      END;
      $$ LANGUAGE plpgsql;

      DROP TRIGGER IF EXISTS orders_delivers_trigger ON Orders CASCADE;
      CREATE CONSTRAINT TRIGGER orders_delivers_trigger
        AFTER UPDATE OF oid OR INSERT ON Orders
        DEFERRABLE INITIALLY DEFERRED
        FOR EACH ROW
        EXECUTE PROCEDURE orders_delivers_total_participation();
    SQL
  end

  def down
    execute <<-SQL
      DROP TRIGGER orders_delivers_trigger ON Orders CASCADE;
      DROP FUNCTION orders_delivers_total_participation() CASCADE;
    SQL
  end
end
