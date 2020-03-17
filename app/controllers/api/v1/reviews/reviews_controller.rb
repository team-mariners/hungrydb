# frozen_string_literal: true

class Api::V1::Reviews::ReviewsController < Api::V1::BaseController
  def index
    customer_reviews_array = []
    reviews = helpers.retrieve_customer_reviews().to_a

    reviews.each do |review|
      review_oid = review['oid']
      review['customer_name'] = helpers.retrieve_review_customer(review_oid)
      review['restaurant_name'] = helpers.retrieve_review_restaurant(review_oid)
      review['foods'] = helpers.retrieve_review_foods(review_oid)
      review['rider_name'] = helpers.retrieve_review_rider(review['rider_id'])
      customer_reviews_array.append(review)
    end

    render json: { 'reviews': customer_reviews_array }
  end
end
