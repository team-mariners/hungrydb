class AddColumnNonNullConstraintToRestaurants < ActiveRecord::Migration[6.0]
  def change
    change_column_null :restaurants, :manager_id, false
  end
end
