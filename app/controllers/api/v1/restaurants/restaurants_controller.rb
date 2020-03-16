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
                                        params[:id], section['url_id'])
    end

    render json: { 'menu': menu_hash }
  end

  private

  def restaurant_id_param
    params.require(:restaurant).permit(:id)
  end
end
