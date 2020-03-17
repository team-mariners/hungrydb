class CreateDeliversDeleteTrigger < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL
      CREATE OR REPLACE FUNCTION delivers_delete_orders_constraint() RETURNS TRIGGER AS $$
      BEGIN
        IF (
          EXISTS (SELECT 1
                  FROM Orders O
                  WHERE O.oid = OLD.oid)
        ) THEN
          RAISE EXCEPTION 'Must also delete Order related to Delivers record being deleted';
        END IF;
        RETURN OLD;
      END;
      $$ LANGUAGE plpgsql;

      DROP TRIGGER IF EXISTS delivers_delete_trigger ON Delivers CASCADE;
      CREATE CONSTRAINT TRIGGER delivers_delete_trigger
        AFTER DELETE ON Delivers
        FOR EACH ROW
        EXECUTE PROCEDURE delivers_delete_orders_constraint();
    SQL
  end

  def down
    execute <<-SQL
      DROP TRIGGER delivers_delete_trigger ON Delivers CASCADE;
      DROP FUNCTION delivers_delete_orders_constraint() CASCADE;
    SQL
  end
end
