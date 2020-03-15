class CreateHasPromotions < ActiveRecord::Migration[6.0]
  def up
    execute "CREATE TABLE has_promotions (
      restaurant_id bigint REFERENCES restaurants ON DELETE CASCADE,
      restaurant_promotion_id bigint REFERENCES restaurant_promotions ON DELETE CASCADE,
      PRIMARY KEY (restaurant_id, restaurant_promotion_id)
    );"
  end

  def down
    execute "DROP TABLE has_promotions;"
  end
end
