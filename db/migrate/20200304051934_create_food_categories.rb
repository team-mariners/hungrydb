class CreateFoodCategories < ActiveRecord::Migration[6.0]
  def change
    create_table :food_categories do |t|
      t.belongs_to :restaurant, foreign_key: true
      t.string :name, null: false
      t.timestamps
    end
  end
end
