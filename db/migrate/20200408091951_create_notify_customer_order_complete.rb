# frozen_string_literal: true

class CreateNotifyCustomerOrderComplete < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL
      CREATE OR REPLACE FUNCTION notify_customer_order_complete() RETURNS TRIGGER AS $$
      DECLARE
        cust_id INTEGER;
        rider_name TEXT;
      BEGIN
        SELECT customer_id INTO cust_id
        FROM Orders O
        WHERE O.oid = NEW.oid;

        SELECT username INTO rider_name
        FROM Users U
        WHERE U.id = NEW.rider_id;

        PERFORM pg_notify ('user_' || cust_id::TEXT || '_channel', rider_name);
        RETURN NULL;
      END;
      $$ LANGUAGE plpgsql;

      DROP TRIGGER IF EXISTS notify_customer_order_complete_trigger ON Delivers CASCADE;
      CREATE TRIGGER notify_customer_order_complete_trigger
        AFTER UPDATE OF order_delivered_time
        ON Delivers
        FOR EACH ROW
        WHEN (NEW.rider_id IS NOT NULL)
        EXECUTE PROCEDURE notify_customer_order_complete();
    SQL
  end

  def down
    execute <<-SQL
      DROP TRIGGER notify_customer_order_complete_trigger ON Orders CASCADE;
      DROP FUNCTION notify_customer_order_complete() CASCADE;
    SQL
  end
end
