namespace :database do
  desc "Reset the number of orders in foods table to 0 every midnight."
  task reset_num_orders: :environment do
    ActiveRecord::Base.connection.exec_query(
      "UPDATE foods
      SET num_orders = 0;"
    )
  end
end
