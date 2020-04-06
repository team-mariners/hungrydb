# frozen_string_literal: true

class ReviewController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    insert()
  end

  private

  def review_params
    params.require(:review).permit(:oid, :rider_id, :rider_rating, :food_review)
  end

  def insert
    filtered_params = review_params

    ActiveRecord::Base.connection.begin_db_transaction

    # Insert the review
    ActiveRecord::Base.connection.exec_query(
      "INSERT INTO Reviews(oid, rider_id, rider_rating, food_review)
      VALUES (#{filtered_params['oid']}, #{filtered_params['rider_id']},
              #{filtered_params['rider_rating']},
              '#{filtered_params['food_review']}')"
    )

    ActiveRecord::Base.connection.commit_db_transaction
  end
end
