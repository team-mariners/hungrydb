class CreateRiders < ActiveRecord::Migration[6.0]
  def change
    create_table :riders do |t|
      t.references :users, null: false, foreign_key: true
      t.string :currLocation
      t.string :status
      t.float :fee

      t.timestamps
    end
  end
end
