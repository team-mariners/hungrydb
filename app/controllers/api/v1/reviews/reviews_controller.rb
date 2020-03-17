# frozen_string_literal: true

class Api::V1::Reviews::ReviewsController < Api::V1::BaseController
    def index
      render json: { 'reviews': helpers.retrieve_reviews }
    end
end
