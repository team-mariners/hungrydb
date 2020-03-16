class CreateOrders < ActiveRecord::Migration[6.0]
  def up
    execute "CREATE TABLE Orders (
      oid bigint PRIMARY KEY,
      customer_id bigint REFERENCES Customers(user_id),
      promo_id bigint REFERENCES Promotions,
      restaurant_id bigint REFERENCES Restaurants,
      point_offset bigint,
      payment_method varchar(20),
      delivery_fee bigint,
      date_time timestamp,
      status varchar(20)   
    );"
  end

  def down
    execute "DROP TABLE Orders;"
  end
end
