class AddIndexToRestaurants < ActiveRecord::Migration[6.0]
  def change
    remove_index :restaurants, :manager_id
    add_index :restaurants, :manager_id, unique: true
    add_foreign_key :restaurants, :managers, on_delete: :cascade
  end
end
