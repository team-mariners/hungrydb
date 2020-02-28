class RenameMaxLimitColumnInFoods < ActiveRecord::Migration[6.0]
  def change
    rename_column :foods, :maxLimit, :dailyLimit
  end
end
