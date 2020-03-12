class FoodCategoriesController < ApplicationController
    before_action :get_restaurant
    before_action :load_food_category, only: %i[update destroy]

    def index
        @food_categories = ActiveRecord::Base.connection.exec_query(
            "SELECT * 
            FROM menu_sections
            WHERE restaurant_id = #{@restaurant["id"]}"
        ).to_a

        render json: @food_categories
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
        @food_category = ActiveRecord::Base.connection.exec_query(
            "SELECT * FROM menu_sections
            WHERE url_id = #{params[:id]};"
        ).to_a[0]
    end

    def food_categories_param
        params.require(:menu_section).permit(:name)
    end

    def write(type)
        begin
            filtered_param = food_categories_param
            name = filtered_param["name"]

            if type == :create
                ActiveRecord::Base.connection.exec_query(
                    "INSERT INTO menu_sections(ms_name, restaurant_id)
                    VALUES ('#{name}', #{@restaurant["id"]});"
                )

                @food_category = {"ms_name" => name}
            else type == :update
                @food_category.update!(food_categories_param)
            end
            render json: @food_category
        rescue ActiveRecord::RecordNotUnique
            render json: {errors: "Food category already exists!"}, status: 500
        rescue ActiveRecord::RecordInvalid
            render json: {errors: "Food category is invalid!"}, status: 500
        rescue => error
            render json: {errors: error.message}, status: 500
        end
    end
end