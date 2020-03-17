# frozen_string_literal: true

class CreateMenuSections < ActiveRecord::Migration[6.0]
  def up
    # Create an auto-incremented id for Restaurants
    execute "CREATE SEQUENCE menu_sections_url_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;"

    execute "CREATE TABLE menu_sections (
      url_id bigint UNIQUE NOT NULL DEFAULT nextval('menu_sections_url_id_seq'),
      ms_name varchar(100) NOT NULL,
      restaurant_id bigint NOT NULL,
      PRIMARY KEY(ms_name, restaurant_id),
      FOREIGN KEY(restaurant_id) REFERENCES restaurants(id)
        ON DELETE CASCADE
    );"

    # This will auto drop the sequence when Restaurants is dropped
    execute "ALTER SEQUENCE menu_sections_url_id_seq OWNED BY menu_sections.url_id;"
  end

  def down
    execute "DROP TABLE menu_sections;"
  end
end
