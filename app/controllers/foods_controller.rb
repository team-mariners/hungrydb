class FoodsController < ApplicationController
    before_action only: %i[create update destroy] do
        verify_role!('manager') 
    end 
    before_action :get_restaurant
    before_action :load_food, only: %i[update destroy]

    def index
        @foods = ActiveRecord::Base.connection.exec_query(
            "SELECT * 
            FROM foods JOIN menu_sections USING(ms_name, restaurant_id)
            WHERE restaurant_id = #{@restaurant["id"]}"
        )

        @foods.each do |row|
            menu_section = {"ms_name" => row["ms_name"], "url_id" => row["url_id"]}
            row["menu_section"] = menu_section
            row.delete("ms_name")
            row.delete("url_id")
        end

        render json: @foods
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
        params.require(:food).permit(:name, :price, :dailyLimit, :food_category_id)
    end

    def food_params_hash
        food_params.to_hash.symbolize_keys
    end

    def get_food_as_hash(food)
        food_category = FoodCategory.find(food.food_category_id)
        hash = food.attributes
        hash.delete('food_category_id')
        hash['foodCategory'] = food_category.attributes
        return hash
    end

    def get_restaurant
        @restaurant = Utilities.get_restaurant(current_user)
    end

    def write(type, hash)
        begin
            if type == :create
                @food = @restaurant.foods.create!(hash)
            else type == :update
                @food.update!(hash)
            end
            render json: get_food_as_hash(@food)
        rescue ActiveRecord::RecordInvalid
            render json: {errors: "Dish is invalid!"}, status: 500
        rescue ActiveRecord::RecordNotUnique
            render json: {errors: "Dish already exists!"}, status: 500
        rescue
            render json: {errors: "Internal server error!"}, status: 500
        end
    end
end