class CreateComprises < ActiveRecord::Migration[6.0]
  def up
    execute "CREATE TABLE Comprises (
      oid bigint NOT NULL,
      food_id bigint NOT NULL,
      quantity bigint,
      PRIMARY KEY (oid, food_id)
      FOREIGN KEY (oid),
      FOREIGN KEY (food_id)
    );"
  end

  def down
    execute "DROP TABLE Comprises;"
  end
end
