class FoodCategoriesController < ApplicationController
    before_action :get_restaurant
    before_action :load_food_category, only: %i[update destroy]

    def index
        render json: @restaurant.food_categories
    end

    def create
        write(:create)
    end

    def update
        write(:update)
    end

    def destroy
        if @food_category.foods.empty?
            @food_category.destroy
        else
            render json: {errors: "Cannot delete food category that has dishes!"}, status: 500
        end
    end

    private

    def get_restaurant
        @restaurant = Utilities.get_restaurant(current_user)
    end

    def load_food_category
        @food_category = @restaurant.food_categories.find(params[:id])
    end

    def food_categories_param
        params.require(:food_category).permit(:name)
    end

    def write(type)
        begin
            if type == :create
                @food_category = @restaurant.food_categories.create!(food_categories_param)
            else type == :update
                @food_category.update!(food_categories_param)
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