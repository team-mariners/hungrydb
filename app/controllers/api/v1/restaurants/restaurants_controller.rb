# frozen_string_literal: true

class Api::V1::Restaurants::RestaurantsController < Api::V1::BaseController
  def index
    render json: { 'restaurants': helpers.retrieve_restaurants }
  end

  def menu
    # Create hash of menu section's ms_name => { hash of food in section }
    menu_hash = {}
    menu_sections = helpers.retrieve_menu_sections(params[:id]).to_a

    menu_sections.each do |section|
      menu_hash[section['ms_name']] = helpers.retrieve_section_food(
                                        params[:id], section['url_id']
                                      )
    end

    render json: { 'menu': menu_hash }
  end

  def reviews
    restaurant_reviews_array = []
    reviews = helpers.retrieve_restaurant_reviews(params[:id]).to_a

    reviews.each do |review|
      review_oid = review['oid']
      review['customer_name'] = helpers.retrieve_review_customer(review_oid)
      review['restaurant_name'] = helpers.retrieve_review_restaurant(review_oid)
      review['foods'] = helpers.retrieve_review_foods(review_oid)
      review['rider_name'] = helpers.retrieve_review_rider(review['rider_id'])
      restaurant_reviews_array.append(review)
    end

    render json: { 'reviews': restaurant_reviews_array }
  end

  private

  def restaurant_id_param
    params.require(:restaurant).permit(:id)
  end
end
