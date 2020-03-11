class UpdateUniqueIndexInFoodCategories < ActiveRecord::Migration[6.0]
  def change
    add_index :food_categories, ["restaurant_id", "name"], unique: true
  end
end
