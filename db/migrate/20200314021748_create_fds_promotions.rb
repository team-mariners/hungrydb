# frozen_string_literal: true

class CreateFdsPromotions < ActiveRecord::Migration[6.0]
  def up
    execute "CREATE TABLE fds_promotions (
      promotion_id bigint PRIMARY KEY,
      p_type promo_type NOT NULL DEFAULT 'fds'
        CONSTRAINT fds_promotions_p_type
        CHECK (p_type = 'fds'),
      FOREIGN KEY(promotion_id, p_type) REFERENCES promotions(id, p_type)
        MATCH FULL
        ON DELETE CASCADE
    );"
  end

  def down
    execute "DROP TABLE fds_promotions;"
  end
end
