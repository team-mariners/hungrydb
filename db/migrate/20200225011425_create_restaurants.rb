class CreateRestaurants < ActiveRecord::Migration[6.0]
  # For committing transaction
  def up
    # Create an auto-incremented id for Restaurants
    execute "CREATE SEQUENCE restaurants_id_seq
      START WITH 1
      INCREMENT BY 1
      NO MINVALUE
      NO MAXVALUE
      CACHE 1;"

    execute "CREATE TABLE restaurants (
      id bigint NOT NULL DEFAULT nextval('restaurants_id_seq'),
      name varchar(300) UNIQUE NOT NULL,
      min_order_cost numeric NOT NULL,
      address varchar(500) NOT NULL,
      manager_id bigint NOT NULL UNIQUE,
      PRIMARY KEY(id),
      FOREIGN KEY(manager_id) REFERENCES managers(id)
        ON DELETE CASCADE
    );"

    # This will auto drop the sequence when Restaurants is dropped
    execute "ALTER SEQUENCE restaurants_id_seq OWNED BY restaurants.id;"
  end

  # For rolling back
  def down
    execute "DROP TABLE restaurants;"
  end
end
