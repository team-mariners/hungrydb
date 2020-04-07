namespace :database do
  desc "Reset the number of orders in foods table to 0 every midnight."
  task reset_num_orders: :environment do
    ActiveRecord::Base.connection.exec_query(
      "UPDATE foods
      SET num_orders = 0;"
    )
  end

  desc "Create salary entries for full-time riders at the beginning of every month"
  task create_full_time_riders_salary: :environment do
    ActiveRecord::Base.connection.exec_query(
      "INSERT INTO rider_salaries (rider_id, start_date, end_date, base_salary)
      (SELECT id, date_trunc('month', CURRENT_DATE), date_trunc('month', CURRENT_DATE) + interval '1 month - 1 day',
        monthly_base_salary
       FROM full_time_riders)
      ON CONFLICT DO NOTHING;"      
    )
 end

  desc "Create salary entries for part-time riders at the beginning of every week"
  task create_part_time_riders_salary: :environment do
    ActiveRecord::Base.connection.exec_query(
      "INSERT INTO rider_salaries (rider_id, start_date, end_date, base_salary)
      (SELECT id, date_trunc('week', CURRENT_DATE), date_trunc('week', CURRENT_DATE) + interval '1 week - 1 day',
        weekly_base_salary
       FROM part_time_riders)
      ON CONFLICT DO NOTHING;"
    )
  end
end
