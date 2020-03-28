class Api::V1::Statistics::StatisticsController < Api::V1::BaseController
    before_action :get_restaurant 

    def monthly_overall_summary
        ActiveRecord::Base.connection.begin_db_transaction
        orders_summary = ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*) as total_orders, COALESCE(SUM(total_price - delivery_fee), 0) as total_cost
            FROM Orders
            WHERE restaurant_id = #{@restaurant["id"]}
            AND date_time BETWEEN '#{params["startDate"]}' AND '#{params["endDate"]}';"
        ).rows[0]

        popular_dishes = ActiveRecord::Base.connection.exec_query(
            "SELECT (SELECT f_name FROM Foods WHERE id = C.food_id) AS f_name
            FROM Comprises C
            WHERE oid IN (
                SELECT oid
                FROM Orders
                WHERE restaurant_id = #{@restaurant["id"]}
                AND date_time BETWEEN '#{params["startDate"]}' AND '#{params["endDate"]}'
            )
            GROUP BY food_id
            ORDER BY SUM(quantity) DESC
            LIMIT 5;"            
        ).rows.flatten
        ActiveRecord::Base.connection.commit_db_transaction

        result = {total_orders: orders_summary[0], total_cost: orders_summary[1], popular_dishes: popular_dishes}
        render json: result
    end

    def promotions_summary
        summary = ActiveRecord::Base.connection.exec_query(
            "SELECT id, p_name, start_datetime, end_datetime, num_redeemed, (
                SELECT COALESCE(SUM(total_price - delivery_fee), 0)
                FROM Orders
                WHERE promo_id = id
            ) as total_order_cost
            FROM promotions
            WHERE id IN (
                SELECT restaurant_promotion_id
                FROM has_promotions
                WHERE restaurant_id = #{@restaurant["id"]}
            )
            ORDER BY id"
        ).to_a 

        render json: summary
    end

    private

    def month_params
        params.require(:month).permit(:month)
    end

    def get_restaurant
        @restaurant = helpers.get_restaurant(current_user)
    end
end    