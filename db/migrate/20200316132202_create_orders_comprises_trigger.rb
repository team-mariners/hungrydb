# frozen_string_literal: true

class CreateOrdersComprisesTrigger < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL
      CREATE OR REPLACE FUNCTION orders_comprises_total_participation() RETURNS TRIGGER AS $$
      BEGIN
        IF NOT (
          EXISTS (SELECT 1
                  FROM Comprises C
                  WHERE C.oid = NEW.oid)
        ) THEN
          RAISE EXCEPTION 'Must insert a tuple for current Order into Comprises table';
        END IF;
        RETURN NULL;
      END;
      $$ LANGUAGE plpgsql;

      DROP TRIGGER IF EXISTS orders_comprises_trigger ON Orders CASCADE;
      CREATE CONSTRAINT TRIGGER orders_comprises_trigger
        AFTER UPDATE OF oid OR INSERT ON Orders
        DEFERRABLE INITIALLY DEFERRED
        FOR EACH ROW
        EXECUTE PROCEDURE orders_comprises_total_participation();
    SQL
  end

  def down
    execute <<-SQL
      DROP TRIGGER orders_comprises_trigger ON Orders CASCADE;
      DROP FUNCTION orders_comprises_total_participation() CASCADE;
    SQL
  end
end
