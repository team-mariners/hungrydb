# frozen_string_literal: true

class Api::V1::Promotions::PromotionsController < Api::V1::BaseController
  before_action :get_restaurant, only: %i[index_restaurant]

  def index
    res_promos_hash = {}
    restaurants = helpers.retrieve_restaurants_id_name().to_a
    
    restaurants.each do |res|
      # Create hash of { rname => array of promotions }
      res_promos_hash[res['name']] = helpers.retrieve_restaurant_promos(res['id'])
    end

    render json: { 'fds_promos': helpers.retrieve_fds_promos,
                 'restaurant_promos': res_promos_hash }
  end

  def index_restaurant
    promotions = ActiveRecord::Base.connection.exec_query(
      "SELECT *
      FROM promotions
        WHERE id IN (
        SELECT restaurant_promotion_id
        FROM has_promotions
        WHERE restaurant_id = #{@restaurant['id']}
      );"
    ).to_a

    promotions.each do |row|
      format_promotion_row(row)
    end

    render json: promotions
  end

  private 

  def get_restaurant
    @restaurant = helpers.get_restaurant(current_user)
  end    

  def format_promotion_row(row)
    row["start_datetime"] = row["start_datetime"].in_time_zone
    row["end_datetime"] = row["end_datetime"].in_time_zone
  end
end
