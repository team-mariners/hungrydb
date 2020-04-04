class CreateUpdateOrderStatusTrigger < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL
      CREATE OR REPLACE FUNCTION update_order_status() RETURNS TRIGGER AS $$
      BEGIN
        IF NEW.order_delivered_time IS NOT NULL THEN
          UPDATE Orders O
          SET status = 'complete'
          WHERE O.oid = NEW.oid;
        END IF;
      END;
      $$ LANGUAGE plpgsql;

      DROP TRIGGER IF EXISTS update_order_status_trigger ON Delivers CASCADE;
      CREATE TRIGGER update_order_status_trigger
        AFTER UPDATE OF order_delivered_time ON Delivers
        FOR EACH ROW
        EXECUTE FUNCTION update_order_status();
    SQL
  end

  def down
    execute <<-SQL
      DROP TRIGGER update_order_status_trigger ON Delivers CASCADE;
      DROP FUNCTION update_order_status() CASCADE;    
    SQL
  end
end
