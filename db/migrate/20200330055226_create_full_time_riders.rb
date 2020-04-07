# frozen_string_literal: true

class CreateFullTimeRiders < ActiveRecord::Migration[6.0]
  def up
    execute "CREATE TABLE full_time_riders (
      id bigint PRIMARY KEY,
      r_type rider_type NOT NULL DEFAULT 'full_time'
        CONSTRAINT full_time_riders_r_type
        CHECK (r_type = 'full_time'),
      monthly_base_salary numeric NOT NULL,    
      FOREIGN KEY(id, r_type) REFERENCES riders(user_id, r_type)
        MATCH FULL
        ON DELETE CASCADE
    );"
  end

  # For rolling back
  def down
    execute "DROP TABLE full_time_riders;"
  end
end
