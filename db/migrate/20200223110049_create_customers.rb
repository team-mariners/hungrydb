class CreateCustomers < ActiveRecord::Migration[6.0]
  def change
    create_table :customers do |t|
      t.references :users, null: false, foreign_key: true
      t.bigint :can
      t.integer :cvv
      t.integer :rewardPoints, null: false, default: 0
      t.string :locationHistory

      t.timestamps
    end
  end
end
