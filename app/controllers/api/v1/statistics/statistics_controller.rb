class Api::V1::Statistics::StatisticsController < Api::V1::BaseController
    def monthly_overall_summary
        ActiveRecord::Base.connection.begin_db_transaction
        # Total cost can just do a sum in the SELECT clause
        total_orders = ActiveRecord::Base.connection.exec_query(
            "SELECT COUNT(*) as total_orders
            FROM Orders
            WHERE date_time BETWEEN '#{params["startDate"]}' AND '#{params["endDate"]}';"
        ).rows[0][0]

        popular_dishes = ActiveRecord::Base.connection.exec_query(
            "SELECT (SELECT f_name FROM Foods WHERE id = C.food_id) AS f_name
            FROM Comprises C
            WHERE oid IN (
                SELECT oid
                FROM Orders
                WHERE date_time BETWEEN '#{params["startDate"]}' AND '#{params["endDate"]}'
            )
            GROUP BY food_id
            ORDER BY SUM(quantity) DESC
            LIMIT 5;"            
        ).rows.flatten
        ActiveRecord::Base.connection.commit_db_transaction

        result = {total_orders: total_orders, popular_dishes: popular_dishes}

        render json: result
    end

    private
    def month_params
        params.require(:month).permit(:month)
    end
end    