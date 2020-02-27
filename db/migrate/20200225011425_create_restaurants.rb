class CreateRestaurants < ActiveRecord::Migration[6.0]
  def change
    create_table :restaurants do |t|
      t.belongs_to :manager
      t.string :name, null: false
      t.decimal :minOrderCost, null: false
      t.timestamps
    end
  end
end
