# frozen_string_literal: true

class Api::V1::Promotions::FdsPromotionsController < Api::V1::BaseController
  def index
    render json: {'fds_promos': helpers.retrieve_fds_promos}
  end
end
