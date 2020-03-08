class UpdateUniqueIndexInFoods < ActiveRecord::Migration[6.0]
  def change
    add_index :foods, ["restaurant_id", "name"], unique: true
  end
end
