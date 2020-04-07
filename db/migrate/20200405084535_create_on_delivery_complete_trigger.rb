class CreateOnDeliveryCompleteTrigger < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL
      CREATE OR REPLACE FUNCTION on_delivery_complete() RETURNS TRIGGER AS $$
      BEGIN
        IF NEW.order_delivered_time IS NOT NULL THEN
          -- Update the status of the order to complete
          UPDATE Orders O
          SET status = 'complete'
          WHERE O.oid = NEW.oid;

          -- Update the rider's commission in the rider_salaries table
          UPDATE rider_salaries R
          SET commission = commission + (SELECT value::numeric FROM constants WHERE c_key = 'COMMISSION')
          WHERE R.rider_id = NEW.rider_id
          AND R.start_date = (
            CASE (SELECT r_type FROM riders WHERE user_id = NEW.rider_id)
              WHEN 'full_time' THEN date_trunc('month', NEW.order_delivered_time)
              WHEN 'part_time' THEN date_trunc('week', NEW.order_delivered_time)
            END
          );
        END IF;
        RETURN NULL;
      END;
      $$ LANGUAGE plpgsql;

      DROP TRIGGER IF EXISTS on_delivery_complete_trigger ON Delivers CASCADE;
      CREATE TRIGGER on_delivery_complete_trigger
        AFTER UPDATE OF order_delivered_time OR INSERT ON Delivers
        FOR EACH ROW
        EXECUTE PROCEDURE on_delivery_complete();
    SQL
  end

  def down
    execute <<-SQL
      DROP TRIGGER on_delivery_complete_trigger ON Delivers CASCADE;
      DROP FUNCTION on_delivery_complete() CASCADE;    
    SQL
  end
end
