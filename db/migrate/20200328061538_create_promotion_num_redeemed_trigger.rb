# frozen_string_literal: true

class CreatePromotionNumRedeemedTrigger < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL
      CREATE OR REPLACE FUNCTION update_num_redeemed() RETURNS TRIGGER AS $$
      BEGIN
        IF NEW.promo_id IS NOT NULL THEN
          UPDATE promotions
            SET num_redeemed = num_redeemed + 1
            WHERE id = NEW.promo_id;
        END IF;
        RETURN NULL;
      END;
      $$ LANGUAGE plpgsql;

      DROP TRIGGER IF EXISTS promotion_num_redeemed_trigger ON Orders CASCADE;
      CREATE TRIGGER promotion_num_redeemed_trigger
        AFTER INSERT ON Orders
        FOR EACH ROW
        EXECUTE PROCEDURE update_num_redeemed();
    SQL
  end

  def down
    execute <<-SQL
      DROP TRIGGER IF EXISTS promotion_num_redeemed_trigger ON Orders CASCADE;
      DROP FUNCTION update_num_redeemed() CASCADE;
    SQL
  end
end
