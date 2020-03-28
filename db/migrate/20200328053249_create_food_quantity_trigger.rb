class CreateFoodQuantityTrigger < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL
      CREATE OR REPLACE FUNCTION update_food_quantity() RETURNS TRIGGER AS $$
      BEGIN
        UPDATE foods
          SET num_orders = num_orders + NEW.quantity
          WHERE id = NEW.food_id
          AND 'in progress' = (SELECT status FROM Orders O WHERE O.oid = NEW.oid);
        RETURN NULL;
      END;
      $$ LANGUAGE plpgsql;

      DROP TRIGGER IF EXISTS food_quantity_trigger ON Comprises CASCADE;
      CREATE TRIGGER food_quantity_trigger 
        AFTER INSERT ON Comprises
        FOR EACH ROW
        EXECUTE FUNCTION update_food_quantity();
    SQL
  end

  def down
    execute <<-SQL
      DROP TRIGGER food_quantity_trigger ON Comprises CASCADE;
      DROP FUNCTION update_food_quantity() CASCADE;  
    SQL
  end
end
