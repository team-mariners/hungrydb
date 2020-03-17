# frozen_string_literal: true

class CreateReviews < ActiveRecord::Migration[6.0]
  def up
    execute "CREATE TABLE Reviews (
      oid bigint,
      rider_id bigint,
      rider_rating integer
        CONSTRAINT rider_rating_bounds
        CHECK (rider_rating > 0 and rider_rating <= 5),
      food_review varchar(1000),
      PRIMARY KEY (oid),
      FOREIGN KEY (oid) REFERENCES Orders
        ON DELETE CASCADE,
      FOREIGN KEY (rider_id) REFERENCES Riders(user_id)
    );"
  end

  def down
    execute "DROP TABLE Reviews;"
  end
end
