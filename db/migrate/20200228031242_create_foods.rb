class CreateFoods < ActiveRecord::Migration[6.0]
  def change
    create_table :foods do |t|
      t.belongs_to :restaurant, foreign_key: true
      t.string :name, null: false
      t.integer :maxLimit, null: false
      t.integer :numOrders, null: false
      t.decimal :price, null: false
      t.timestamps
    end
  end
end
