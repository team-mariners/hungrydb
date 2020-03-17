class CreateComprisesDeleteTrigger < ActiveRecord::Migration[6.0]
  # When deleting last Orders-Foods Comprises entry, the related Order must also be deleted from Orders
  def up
    execute <<-SQL
      CREATE OR REPLACE FUNCTION comprises_delete_orders_constraint() RETURNS TRIGGER AS $$    
      BEGIN
        IF (
          EXISTS (SELECT 1
                  FROM Orders O
                  WHERE O.oid = OLD.oid)
        ) THEN
          RAISE EXCEPTION 'Must also delete Order with its final remaining Comprises record being deleted';
        END IF;
        RETURN OLD;
      END;
      $$ LANGUAGE plpgsql;

      DROP TRIGGER IF EXISTS comprises_delete_trigger ON Comprises CASCADE;
      CREATE CONSTRAINT TRIGGER comprises_delete_trigger
        AFTER DELETE ON Comprises
        FOR EACH ROW
        EXECUTE PROCEDURE delivers_delete_orders_constraint();
    SQL
  end

  def down
    execute <<-SQL
      DROP TRIGGER comprises_delete_trigger ON Comprises CASCADE;
      DROP FUNCTION comprises_delete_orders_constraint() CASCADE;
    SQL
  end
end
