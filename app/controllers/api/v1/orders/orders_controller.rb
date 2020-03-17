# frozen_string_literal: true

class Api::V1::Orders::OrdersController < Api::V1::BaseController
  def index
    orders_hash = {}
    orders = helpers.retrieve_orders().to_a
    
    orders.each do |order|
      current_order = order['oid']
      order['foods'] = helpers.retrieve_order_foods(current_order)
      orders_hash[current_order] = order
    end

    render json: { 'orders': orders_hash }
  end
end
