class FoodCategoriesController < ApplicationController
    before_action :get_restaurant
    before_action :load_food_category, only: %i[update destroy]

    def index
        @food_categories = ActiveRecord::Base.connection.exec_query(
            "SELECT url_id, ms_name
            FROM menu_sections
            WHERE restaurant_id = #{@restaurant["id"]}
            ORDER BY url_id"
        ).to_a

        render json: @food_categories
    end

    def create
        write(:create)
    end

    def update
        write(:update)
    end

    # Only destroy food category that does not have dish in it
    def destroy
        # Test this query on rail console for menu section that has food
        ActiveRecord::Base.connection.exec_query(
            "DELETE FROM menu_sections
            WHERE url_id = #{params[:id]}
            AND NOT EXISTS (
                SELECT 1
                FROM Foods
                WHERE ms_url_id = #{params[:id]}
            );"
        )        

        menu_section = ActiveRecord::Base.connection.exec_query(
            "SELECT 1
            FROM menu_sections
            WHERE url_id = #{params[:id]}"
        )

        if (!menu_section.empty?)
            render json: {errors: "Cannot delete menu section that has dish in it!"}, status: 500
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
            else type == :update
                old_name = @food_category["ms_name"]

                ActiveRecord::Base.connection.exec_query(
                    "UPDATE menu_sections
                    SET ms_name='#{name}'
                    WHERE ms_name='#{old_name}'
                    AND restaurant_id=#{@restaurant["id"]}"
                )
            end

            @food_category = get_food(name)
            render json: @food_category
        rescue ActiveRecord::RecordNotUnique
            render json: {errors: "Food category already exists!"}, status: 500
        rescue ActiveRecord::RecordInvalid
            render json: {errors: "Food category is invalid!"}, status: 500
        rescue => error
            render json: {errors: error.message}, status: 500
        end
    end

    def get_food(name)
        ActiveRecord::Base.connection.exec_query(
            "SELECT url_id, ms_name
            FROM menu_sections
            WHERE ms_name='#{name}'
            AND restaurant_id=#{@restaurant["id"]};"
        ).to_a[0]
    end
end