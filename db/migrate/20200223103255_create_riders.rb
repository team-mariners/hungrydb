# frozen_string_literal: true

class CreateRiders < ActiveRecord::Migration[6.0]
  def up
    execute "CREATE TYPE rider_type AS ENUM ('full_time', 'part_time');"

    execute "CREATE TABLE riders (
      user_id bigint NOT NULL PRIMARY KEY,
      r_type rider_type NOT NULL,
      currLocation varchar(300),
      status varchar(300) NOT NULL DEFAULT '',
      created_at timestamp(6) without time zone NOT NULL,
      updated_at timestamp(6) without time zone NOT NULL,
      UNIQUE(user_id, r_type),
      FOREIGN KEY(user_id, role) REFERENCES users(id, roles) ON DELETE CASCADE
    );"
  end

  # For rolling back
  def down
    execute "DROP TABLE riders;"
  end
end
