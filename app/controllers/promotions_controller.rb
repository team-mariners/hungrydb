class PromotionsController < ApplicationController
  before_action :get_restaurant

  def index
    @promotions = ActiveRecord::Base.connection.exec_query(
      "SELECT *
      FROM promotions
        WHERE id IN (
        SELECT restaurant_promotion_id
        FROM has_promotions
        WHERE restaurant_id = #{@restaurant['id']}
      );"
    ).to_a

    @promotions.each do |row|
      format_promotion_row(row)
    end

    render json: @promotions
  end

  private 

  def get_restaurant
    @restaurant = helpers.get_restaurant(current_user)
  end    

  def format_promotion_row(row)
    row["start_date"] = helpers.format_date_time(row["start_date"])
    row["end_date"] = helpers.format_date_time(row["end_date"])
  end
end