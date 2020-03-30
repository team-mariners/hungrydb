# frozen_string_literal: true

class CreateCustomers < ActiveRecord::Migration[6.0]
  def change
    create_table :customers do |t|
      t.belongs_to :user, index: { unique: true }, foreign_key: "id"
      t.bigint :can
      t.integer :cvv
      t.integer :reward_points, null: false, default: 0

      t.timestamps
    end
  end
end
