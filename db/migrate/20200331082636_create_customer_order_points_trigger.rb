# frozen_string_literal: true

class CreateCustomerOrderPointsTrigger < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL
      CREATE OR REPLACE FUNCTION update_customer_points_after_order() RETURNS TRIGGER AS $$
      BEGIN
          UPDATE Customers
          SET reward_points = reward_points - NEW.point_offset
                              + NEW.total_price
          WHERE id = NEW.customer_id;
        RETURN NULL;
      END;
      $$ LANGUAGE plpgsql;

      DROP TRIGGER IF EXISTS customer_order_points_trigger ON Orders CASCADE;
      CREATE TRIGGER customer_order_points_trigger
        AFTER INSERT ON Orders
        FOR EACH ROW
        EXECUTE PROCEDURE update_customer_points_after_order();
    SQL
  end

  def down
    execute <<-SQL
      DROP FUNCTION update_customer_points_after_order() CASCADE;
      DROP TRIGGER IF EXISTS customer_order_points_trigger ON Orders CASCADE;
    SQL
  end
end
