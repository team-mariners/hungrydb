# frozen_string_literal: true

class CreatePartTimeRiders < ActiveRecord::Migration[6.0]
    def up
      execute "CREATE TABLE part_time_riders (
        id bigint,
        weeklyBaseSalary numeric NOT NULL,
        PRIMARY KEY(id),
        FOREIGN KEY(id) REFERENCES riders
          ON DELETE CASCADE
      );"
    end
  
    # For rolling back
    def down
      execute "DROP TABLE part_time_riders;"
    end
  end