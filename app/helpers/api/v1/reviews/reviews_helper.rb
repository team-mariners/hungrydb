# frozen_string_literal: true

module Api::V1::Reviews::ReviewsHelper
  def retrieve_customer_reviews
    reviews_query = "SELECT R.oid, R.rider_id, R.rider_rating, R.food_review
                    FROM Orders O INNER JOIN Reviews R
                         ON O.customer_id = #{current_user.id}
                            and O.oid = R.oid
                    ORDER BY O.date_time DESC"
    ActiveRecord::Base.connection.execute(reviews_query)
  end

  def retrieve_review_customer(oid)
    review_customer_query = "SELECT U.username
                            FROM Orders O INNER JOIN Users U
                                 ON O.oid = #{oid} and O.customer_id = U.id
                            LIMIT 1"
    ActiveRecord::Base.connection.execute(review_customer_query)[0]['username']
  end

  def retrieve_review_restaurant(oid)
    review_restaurant_query = "SELECT R.name
                              FROM Orders O INNER JOIN Restaurants R
                                   ON O.oid = #{oid}
                                   and O.restaurant_id = R.id
                              LIMIT 1"
    ActiveRecord::Base.connection.execute(review_restaurant_query)[0]['name']
  end

  def retrieve_review_foods(oid)
    review_food_query = "SELECT F.id, F.f_name, F.price
                        FROM Comprises C INNER JOIN Foods F
                             ON C.oid = #{oid} and C.food_id = F.id"
    ActiveRecord::Base.connection.execute(review_food_query)
  end

  def retrieve_review_rider(rid)
    review_rider_query = "SELECT username
                         FROM Users
                         WHERE id = #{rid}
                         LIMIT 1"
    ActiveRecord::Base.connection.execute(review_rider_query)[0]['username']
  end
end
