class CreateFullTimeRiders < ActiveRecord::Migration[6.0]
  def up
    execute "CREATE TABLE full_time_riders (
      id bigint,
      monthlyBaseSalary numeric NOT NULL,
      PRIMARY KEY(id),
      FOREIGN KEY(id) REFERENCES riders
        ON DELETE CASCADE
    );"
  end

  # For rolling back
  def down
    execute "DROP TABLE full_time_riders;"
  end
end
