class FoodCategoriesController < ApplicationController
    before_action :get_restaurant

    def index
        render json: @restaurant.food_categories
    end

    def create
        write(:create)
    end

    private

    def get_restaurant
        @restaurant = Utilities.get_restaurant(current_user)
    end

    def food_categories_param
        params.require(:food_category).permit(:name)
    end

    def write(type)
        begin
            if type == :create
                @food_category = @restaurant.food_categories.create!(food_categories_param)
            else type == :update
            end
            render json: @food_category
        rescue ActiveRecord::RecordNotUnique
            render json: {errors: "Food category already exists!"}, status: 500
        rescue ActiveRecord::RecordInvalid
            render json: {errors: "Food category is invalid!"}, status: 500
        rescue
            render json: {errors: "Internal server error!"}, status: 500
        end
    end
end