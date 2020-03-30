# frozen_string_literal: true

class CreateRiders < ActiveRecord::Migration[6.0]
  def up
    execute "CREATE TYPE rider_type AS ENUM ('full_time', 'part_time');"

    execute "CREATE TABLE riders (
      user_id bigint NOT NULL PRIMARY KEY,
      r_type rider_type NOT NULL,
      currLocation varchar(300) NOT NULL,
      status varchar(300) NOT NULL,
      comission numeric NOT NULL,
      UNIQUE(user_id, r_type),
      FOREIGN KEY(user_id) REFERENCES users
        ON DELETE CASCADE
    );"
  end

  # For rolling back
  def down
    execute "DROP TABLE riders;"
  end
end
