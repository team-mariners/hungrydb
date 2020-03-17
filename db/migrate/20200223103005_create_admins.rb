# frozen_string_literal: true

class CreateAdmins < ActiveRecord::Migration[6.0]
  def change
    create_table :admins do |t|
      t.belongs_to :user, index: { unique: true }, foreign_key: "id"

      t.timestamps
    end
  end
end
