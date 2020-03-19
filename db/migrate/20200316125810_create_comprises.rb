# frozen_string_literal: true

class CreateComprises < ActiveRecord::Migration[6.0]
  def up
    execute "CREATE TABLE Comprises (
      oid bigint NOT NULL,
      food_id bigint NOT NULL,
      quantity bigint NOT NULL
        CONSTRAINT quantity_not_zero CHECK (quantity > 0),
      PRIMARY KEY (oid, food_id),
      FOREIGN KEY (oid) REFERENCES Orders,
      FOREIGN KEY (food_id) REFERENCES Foods
    );"
  end

  def down
    execute "DROP TABLE Comprises;"
  end
end
