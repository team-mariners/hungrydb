class MenuSectionsController < ApplicationController
    before_action :get_restaurant

    def index
        @menu_sections = ActiveRecord::Base.connection.exec_query(
            "SELECT url_id, ms_name
            FROM menu_sections
            WHERE restaurant_id = #{@restaurant["id"]}
            ORDER BY url_id"
        ).to_a

        render json: @menu_sections
    end

    def create
        write(:create)
    end

    def update
        write(:update)
    end

    # Only destroy menu section that does not have dish in it
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

    def menu_sections_param
        params.require(:menu_section).permit(:name)
    end

    def write(type)
        begin
            filtered_param = menu_sections_param
            name = filtered_param["name"]

            if type == :create
                ActiveRecord::Base.connection.exec_query(
                    "INSERT INTO menu_sections(ms_name, restaurant_id)
                    VALUES ('#{name}', #{@restaurant["id"]});"
                )
            else type == :update
                ActiveRecord::Base.connection.exec_query(
                    "UPDATE menu_sections
                    SET ms_name = '#{name}'
                    WHERE url_id = #{params[:id]}"
                )
            end

            @menu_section = get_menu_section(name)
            render json: @menu_section
        rescue ActiveRecord::RecordNotUnique
            render json: {errors: "Menu section already exists!"}, status: 500
        rescue ActiveRecord::RecordInvalid
            render json: {errors: "Menu section is invalid!"}, status: 500
        rescue => error
            render json: {errors: error.message}, status: 500
        end
    end

    def get_menu_section(name)
        ActiveRecord::Base.connection.exec_query(
            "SELECT url_id, ms_name
            FROM menu_sections
            WHERE ms_name='#{name}'
            AND restaurant_id=#{@restaurant["id"]};"
        ).to_a[0]
    end
end