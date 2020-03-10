class AddColumnNonNullConstraintToFoods < ActiveRecord::Migration[6.0]
  def change
    change_column_null :foods, :food_category_id, false
    change_column_null :foods, :restaurant_id, false
  end
end
