# frozen_string_literal: true

class CreateDelivers < ActiveRecord::Migration[6.0]
  def up
    execute "CREATE TABLE Delivers (
      oid bigint PRIMARY KEY,
      rider_id bigint,
      customer_location varchar(500) NOT NULL,
      order_time timestamp NOT NULL,
      depart_to_restaurant_time timestamp,
      arrive_at_restaurant_time timestamp,
      depart_to_customer_time timestamp,
      arrive_at_customer_time timestamp,
      FOREIGN KEY (oid) REFERENCES Orders
        ON DELETE CASCADE,
      FOREIGN KEY (rider_id) REFERENCES Riders(user_id)
    );"
  end

  def down
    execute "DROP TABLE Delivers;"
  end
end
