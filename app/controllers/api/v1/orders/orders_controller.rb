# frozen_string_literal: true

class Api::V1::Orders::OrdersController < Api::V1::BaseController
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
end
