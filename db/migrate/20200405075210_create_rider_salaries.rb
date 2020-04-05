class CreateRiderSalaries < ActiveRecord::Migration[6.0]
  def up
    execute "CREATE TABLE rider_salaries (
        rider_id bigint NOT NULL REFERENCES riders,
        start_date date NOT NULL,
        end_date date NOT NULL,
        base_salary numeric NOT NULL,
        commission numeric NOT NULL DEFAULT 0,
        PRIMARY KEY (rider_id, start_date)
      );"
  end

  def down
    execute "DROP TABLE rider_salaries CASCADE;"    
  end
end
