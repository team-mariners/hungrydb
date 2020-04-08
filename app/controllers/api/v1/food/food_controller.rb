# frozen_string_literal: true

class Api::V1::Food::FoodController < Api::V1::BaseController
  def reviews
    food_reviews_array = []
    food_id = helpers.retrieve_food_id(params[:food_name]).to_a[0]['id']
    reviews = helpers.retrieve_food_reviews(food_id).to_a

    reviews.each do |review|
      review_oid = review['oid']
      review['customer_name'] = helpers.retrieve_review_customer(review_oid)
      review['restaurant_name'] = helpers.retrieve_review_restaurant(review_oid)
      review['foods'] = helpers.retrieve_review_foods(review_oid)
      review['rider_name'] = helpers.retrieve_review_rider(review['rider_id'])
      food_reviews_array.append(review)
    end

    render json: { 'reviews': food_reviews_array }
  end
end
