class CreateOrders < ActiveRecord::Migration[6.0]
  def up
    execute "CREATE TYPE payment_type AS ENUM ('cash', 'credit_card');"

    execute "CREATE TYPE status_type AS ENUM ('in_progress', 'complete');"

    execute "CREATE SEQUENCE orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;"

    execute "CREATE TABLE Orders (
      oid bigint DEFAULT nextval('orders_id_seq'),
      customer_id bigint NOT NULL,
      promo_id bigint NOT NULL,
      restaurant_id bigint NOT NULL,
      point_offset bigint NOT NULL DEFAULT 0,
      payment_method payment_type NOT NULL,
      delivery_fee numeric NOT NULL DEFAULT 0,
      date_time timestamp NOT NULL,
      status status_type NOT NULL DEFAULT 'in_progress',
      PRIMARY KEY (oid),
      FOREIGN KEY (customer_id) REFERENCES Customers(user_id),
      FOREIGN KEY (promo_id) REFERENCES Promotions,
      FOREIGN KEY (restaurant_id) REFERENCES Restaurants
    );"
  end

  def down
    execute "DROP TABLE Orders;"
  end
end
