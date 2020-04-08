# frozen_string_literal: true

module Api::V1::Foods::FoodHelper
  def retrieve_food_id(food_name)
    food_id_query = "SELECT id
                    FROM Foods
                    WHERE f_name = '#{food_name}'
                    LIMIT 1"
    ActiveRecord::Base.connection.execute(food_id_query)
  end

  def retrieve_food_reviews(fid)
    food_reviews_query = "SELECT R.oid, R.rider_id, R.rider_rating, R.food_review
                         FROM Reviews R INNER JOIN Orders O
                              USING (oid)
                              INNER JOIN Comprises C
                              ON R.oid = C.oid AND C.food_id = #{fid}
                         ORDER BY O.date_time"
    ActiveRecord::Base.connection.execute(food_reviews_query)
  end
end
