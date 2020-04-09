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
      order['address'] = helpers.retrieve_order_address(current_order)
      order['promocode'] = helpers.retrieve_promo_code(order['promo_id'])
      order['promo_discount'] = helpers.retrieve_promo_discount(order['promo_id'])
      order['foods'] = helpers.retrieve_order_foods(current_order)
      orders_array.append(order)
    end

    render json: { 'orders': orders_array }
  end

  def index_restaurant
    orders = ActiveRecord::Base.connection.exec_query(
      "SELECT oid, point_offset, payment_method, delivery_fee, date_time, status, food_review,
        (total_price - delivery_fee) AS total_cost,
        (SELECT username FROM Users WHERE id = O.customer_id) AS customer_name,
        (SELECT percentage FROM Promotions WHERE id = O.promo_id) AS promo_percentage,
        (SELECT promocode FROM Promotions WHERE id = O.promo_id) AS promocode,
        (SELECT p_type FROM Promotions WHERE id = O.promo_id) AS p_type,
        (SELECT username from Users where id = (SELECT rider_id FROM Delivers D WHERE D.oid = O.oid)) AS rider_name
      FROM Orders O LEFT OUTER JOIN Reviews USING (oid) 
      WHERE restaurant_id = #{@restaurant['id']}
      ORDER BY oid;"
    ).to_a    

    order_ids = get_order_ids(orders)

    if order_ids.empty?
      render json: nil
      return
    end

    ordered_foods = ActiveRecord::Base.connection.exec_query(
      "WITH T AS (
        SELECT *
        FROM Comprises
        WHERE oid IN (#{order_ids.join(",")})
      )    
      SELECT *
      FROM T JOIN Foods F ON (T.food_id = F.id)
      ORDER BY T.oid, F.id;"      
    ).to_a  

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
 end
