class AddForeignKeyToFoods < ActiveRecord::Migration[6.0]
  def change
    add_reference :foods, :food_category, foreign_key: true
  end
end
