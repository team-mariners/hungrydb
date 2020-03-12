class FoodsController < ApplicationController
    before_action only: %i[create update destroy] do
        verify_role!('manager') 
    end 
    before_action :get_restaurant
    before_action :load_food, only: %i[update destroy]

    def index
        @foods = ActiveRecord::Base.connection.exec_query(
            "SELECT * 
            FROM foods F JOIN menu_sections M ON (F.ms_url_id = M.url_id)
            WHERE F.restaurant_id = #{@restaurant["id"]}"
        ).to_a

        @foods.each do |row|
            process_food_row(row)
        end

        render json: @foods
    end

    def create
        write(:create)
    end

    def update
        write(:update)
    end

    def destroy
        @food.destroy
    end

    private

    def load_food
        @food = @restaurant.foods.find(params[:id])
    end

    def food_params
        params.require(:food).permit(:name, :price, :daily_limit, :ms_url_id)
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

    def write(type)
        begin
            filtered_params = food_params
            print filtered_params
            if type == :create
                ActiveRecord::Base.connection.exec_query(
                    "INSERT INTO foods(f_name, daily_limit, price, restaurant_id, ms_url_id)
                    VALUES ('#{filtered_params["name"]}', #{filtered_params["daily_limit"]}, #{filtered_params["price"]},
                            #{@restaurant["id"]}, #{filtered_params["ms_url_id"]})"    
                )

                @food = get_food(filtered_params["name"], @restaurant["id"])
            else type == :update
                @food.update!(hash)
            end
            render json: @food
        rescue ActiveRecord::RecordInvalid
            render json: {errors: "Dish is invalid!"}, status: 500
        rescue ActiveRecord::RecordNotUnique
            render json: {errors: "Dish already exists!"}, status: 500
        rescue => error
            render json: {errors: error.message}, status: 500
        end
    end

    def get_food(name, restaurant_id)
        food_row = ActiveRecord::Base.connection.exec_query(
            "SELECT * 
            FROM foods F JOIN menu_sections M ON (F.ms_url_id = M.url_id)
            WHERE F.f_name = '#{name}'
            AND F.restaurant_id = #{restaurant_id}"
        ).to_a[0]

        return process_food_row(food_row)
    end

    def process_food_row(row)
        menu_section = {"ms_name" => row["ms_name"], "url_id" => row["url_id"]}
        row["menu_section"] = menu_section
        row.delete("ms_name")
        row.delete("url_id")
        row.delete("ms_url_id")

        return row
    end
end