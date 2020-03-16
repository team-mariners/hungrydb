class CreateDelivers < ActiveRecord::Migration[6.0]
  def up
    execute "CREATE TABLE Delivers (
      oid bigint UNIQUE NOT NULL,
      rider_id bigint,
      customer_location varchar(500) NOT NULL,
      order_time time,
      depart_to_restaurant_time time,
      depert_to_customer_time time,
      arrive_at_customer_time time,
      arrive_at_restaurant_time time,
      PRIMARY KEY (oid, rider_id),
      FOREIGN KEY (oid) REFERENCES Orders
        ON DELETE CASCADE,
      FOREIGN KEY (rider_id) REFERENCES Riders(user_id)    
    );"
  end

  def down
    execute "DROP TABLE Delivers;"
  end
end
