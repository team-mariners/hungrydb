# frozen_string_literal: true

class Api::V1::Orders::OrdersController < Api::V1::BaseController
  before_action :get_restaurant, only: %i[index_restaurant]

  def index
    orders_array = []
    orders = helpers.retrieve_orders().to_a
    
    orders.each do |order|
      current_order = order['oid']
      order['customer_name'] = helpers.retrieve_order_customer(current_order)
      order['restaurant_name'] = helpers.retrieve_restaurant_name(order['restaurant_id'])
      order['promocode'] = helpers.retrieve_promo_code(order['promo_id'])
      order['promo_discount'] = helpers.retrieve_promo_discount(order['promo_id'])
      order['foods'] = helpers.retrieve_order_foods(current_order)
      orders_array.append(order)
    end

    render json: { 'orders': orders_array }
  end

  def index_restaurant
    ActiveRecord::Base.connection.begin_db_transaction
    orders = ActiveRecord::Base.connection.exec_query(
      "SELECT oid, point_offset, payment_method, delivery_fee, date_time, status, food_review,
        (SELECT username FROM Users WHERE id = Orders.customer_id) AS customer_name,
        (SELECT percentage FROM Promotions WHERE id = Orders.promo_id) AS promo_percentage
      FROM Orders LEFT OUTER JOIN Reviews USING (oid) 
      WHERE restaurant_id = #{@restaurant['id']}
      ORDER BY oid;"
    ).to_a    

    order_ids = get_order_ids(orders)

    ordered_foods = ActiveRecord::Base.connection.exec_query(
      "WITH T AS (
        SELECT *
        FROM Comprises
        WHERE oid IN (#{order_ids.join(",")})
      )    
      SELECT *
      FROM T JOIN Foods  ON (T.food_id = Foods.id)
      ORDER BY T.oid;"      
    ).to_a  
    ActiveRecord::Base.connection.commit_db_transaction

    process_orders(orders, ordered_foods)

    render json: orders
  end

  private
  def get_restaurant
    @restaurant = helpers.get_restaurant(current_user)
  end

  def get_order_ids(orders)
    result = []
    orders.each do |order|
      result.push(order["oid"])
    end
    return result
  end

  def process_orders(orders, ordered_foods)
    index = 0
    array = []
    
    for food in ordered_foods
      if food["oid"] == orders[index]["oid"]
        array << food
      else 
        orders[index]["foods"] = array        
        index += 1        
        array = []
        
        array << food
      end
    end

    # Handle the last append
    orders[index]["foods"] = array  
  end

  def get_order(row)
    result = row.clone
    return result.extract!("oid", "customer_id", "promo_id", "point_offset", "payment_method",
      "delivery_fee", "date_time", "status")
  end
end
