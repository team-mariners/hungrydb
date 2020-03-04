class FoodsController < ApplicationController
    before_action do
        verify_role!('manager') 
    end 
    before_action :get_restaurant
    before_action :load_food, only: %i[update destroy]

    def index
        render json: @restaurant.foods
    end

    def create
        hash = food_params_hash
        hash = {**hash, numOrders: 0}

        write(:create, hash)
    end

    def update
        hash = food_params_hash
        hash = {**hash, numOrders: @food.numOrders}

        write(:update, hash)
    end

    def destroy
        @food.destroy
    end

    private

    def load_food
        @food = @restaurant.foods.find(params[:id])
    end

    def food_params
        params.require(:food).permit(:name, :price, :dailyLimit)
    end

    def food_params_hash
        food_params.to_hash.symbolize_keys
    end

    def get_restaurant
        @restaurant = Utilities.get_restaurant(current_user)
    end

    def write(type, hash)
        begin
            if type == :create
                @food = @restaurant.foods.create!(hash)
            else type == :update
                @food.update(hash)
            end
            render json: @food
        rescue ActiveRecord::RecordInvalid
            render json: {errors: "Dish is invalid!"}, status: 500
        rescue ActiveRecord::RecordNotUnique
            render json: {errors: "Dish already exists!"}, status: 500
        rescue
            render json: {errors: "Internal server error!"}, status: 500
        end
    end
end