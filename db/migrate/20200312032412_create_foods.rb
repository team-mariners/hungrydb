class CreateFoods < ActiveRecord::Migration[6.0]
  def up
    execute "CREATE SEQUENCE foods_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;"

    execute "CREATE TABLE foods (
      id bigint NOT NULL DEFAULT nextval('foods_id_seq'),
      f_name varchar(100) NOT NULL,
      daily_limit integer NOT NULL
        CONSTRAINT foods_daily_limit CHECK(daily_limit >= 0),
      num_orders integer NOT NULL DEFAULT 0
        CONSTRAINT foods_num_orders CHECK(num_orders >= 0),
      price numeric NOT NULL,
        CONSTRAINT foods_price CHECK(price >= 0),
      is_active boolean NOT NULL DEFAULT true,
      restaurant_id bigint NOT NULL,  
      ms_name varchar(100) NOT NULL,
      UNIQUE (f_name, restaurant_id),
      PRIMARY KEY (id),
      FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
        ON DELETE CASCADE,
      FOREIGN KEY (ms_name, restaurant_id) REFERENCES menu_sections(ms_name, restaurant_id)
        ON UPDATE CASCADE  
        ON DELETE CASCADE        
    );"
        
    execute "ALTER SEQUENCE foods_id_seq OWNED BY foods.id;"
  end

  def down
    execute "DROP TABLE foods;"
  end
end
