# frozen_string_literal: true

class Api::V1::Promotions::PromotionsController < Api::V1::BaseController
  def index
    res_promos_hash = {}
    restaurants = helpers.retrieve_restaurants_id_name().to_a
    
    restaurants.each do |res|
      # Hash of { rname => array of promotions }
      res_promos_hash[res['name']] = helpers.retrieve_restaurant_promos(res['id'])
    end

    render json: { 'restaurant_promos': res_promos_hash,
                'fds_promos': helpers.retrieve_fds_promos }
  end
end
