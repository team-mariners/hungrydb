class FoodCategoriesController < ApplicationController
    before_action :get_restaurant

    def index
        render json: @restaurant.food_categories
    end

    private

    def get_restaurant
        @restaurant = Utilities.get_restaurant(current_user)
    end
end