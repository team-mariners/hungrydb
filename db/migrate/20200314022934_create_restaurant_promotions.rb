# frozen_string_literal: true

class CreateRestaurantPromotions < ActiveRecord::Migration[6.0]
  def up
    execute "CREATE TABLE restaurant_promotions (
      promotion_id bigint PRIMARY KEY,
      p_type promo_type NOT NULL DEFAULT 'restaurant'
        CONSTRAINT restaurant_promotions_p_type
        CHECK (p_type = 'restaurant'),
      FOREIGN KEY(promotion_id, p_type) REFERENCES promotions(id, p_type)
        MATCH FULL
        ON DELETE CASCADE
    );"
  end

  def down
    execute "DROP TABLE restaurant_promotions;"
  end
end
