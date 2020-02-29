class FoodsController < ApplicationController
    before_action :get_restaurant

    def create
        hash = food_params.to_hash.symbolize_keys
        hash = {**hash, numOrders: 0}

        begin
            @food = @restaurant.foods.create!(hash)
            render json: @food
        rescue ActiveRecord::RecordInvalid
            render json: {errors: "Dish is invalid!"}, status: 500
        rescue ActiveRecord::RecordNotUnique
            render json: {errors: "Dish already exists!"}, status: 500
        end
    end

    def index
        render json: @restaurant.foods
    end

    private

    def food_params
        params.require(:food).permit(:name, :price, :dailyLimit)
    end

    def get_restaurant
        @restaurant = Manager.find_by(user_id: current_user.id).restaurant
    end
end