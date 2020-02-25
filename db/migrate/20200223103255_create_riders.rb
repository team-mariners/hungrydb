class CreateRiders < ActiveRecord::Migration[6.0]
  def change
    create_table :riders do |t|
      t.belongs_to :user, index: { unique: true }, foreign_key: "id"
      t.string :currLocation
      t.string :status
      t.float :fee

      t.timestamps
    end
  end
end
