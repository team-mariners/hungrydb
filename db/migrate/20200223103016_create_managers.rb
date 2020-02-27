class CreateManagers < ActiveRecord::Migration[6.0]
  def change
    create_table :managers do |t|
      t.belongs_to :user, index: { unique: true }, foreign_key: "id"

      t.timestamps
    end
  end
end
