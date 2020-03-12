class CreateMenuSections < ActiveRecord::Migration[6.0]
  def up
    execute "CREATE TABLE menu_sections (
      ms_name varchar(100) NOT NULL,
      restaurant_id bigint NOT NULL,
      PRIMARY KEY(ms_name, restaurant_id),
      FOREIGN KEY(restaurant_id) REFERENCES restaurants(id)
        ON DELETE CASCADE
    );"
  end

  def down
    execute "DROP TABLE menu_sections;"
  end
end
