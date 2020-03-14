class CreateRestaurantPromotionsTrigger < ActiveRecord::Migration[6.0]
  def up 
    execute <<-SQL
      CREATE OR REPLACE FUNCTION check_has_promotions_exist() RETURNS TRIGGER AS $$
      DECLARE 
        exist integer; 
      BEGIN
        SELECT DISTINCT 1 INTO exist
          FROM has_promotions
          WHERE restaurant_promotion_id = NEW.promotion_id;
        IF exist IS NULL THEN
          RAISE exception 'Must insert a tuple into has_promotions upon inserting into restaurant_promotions';
        END IF;
        RETURN NULL;
      END;
      $$ LANGUAGE plpgsql;

      DROP TRIGGER IF EXISTS restaurant_promotion_trigger ON restaurant_promotions CASCADE;
      CREATE CONSTRAINT TRIGGER restaurant_promotion_trigger
        AFTER INSERT
        ON restaurant_promotions
        DEFERRABLE INITIALLY DEFERRED
        FOR EACH ROW
        EXECUTE PROCEDURE check_has_promotions_exist();
    SQL
  end

  def down
    execute <<-SQL
      DROP TRIGGER restaurant_promotion_trigger ON restaurant_promotions CASCADE;
      DROP FUNCTION check_has_promotions_exist() CASCADE;      
    SQL
  end
end
