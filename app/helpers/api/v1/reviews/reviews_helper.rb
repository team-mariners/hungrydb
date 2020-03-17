# frozen_string_literal: true

module Api::V1::Reviews::ReviewsHelper
  def retrieve_reviews
    reviews_query = "SELECT R.oid, R.rider_id, R.rider_rating, R.food_review
                    FROM Orders O INNER JOIN Reviews R
                         ON O.customer_id = #{current_user.id}
                            and O.oid = R.oid
                    ORDER BY O.date_time"
    ActiveRecord::Base.connection.execute(reviews_query)
  end
end
