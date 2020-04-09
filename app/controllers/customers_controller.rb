# frozen_string_literal: true

class CustomersController < UsersController
  before_action do
    if !helpers.current_user_has_role?('customer')
      return_unauthorized
    end
  end

  def order_in_progress
    ActiveRecord::Base.connection_pool.with_connection do |connection|
      # connection is the ActiveRecord::ConnectionAdapters::PostgreSQLAdapter object
      conn = connection.instance_variable_get(:@connection)
      # conn is the underlying PG::Connection object, and exposes #wait_for_notify

      begin
        conn.async_exec "LISTEN user_#{current_user.id}_channel"

        conn.wait_for_notify(10) do |channel, pid, payload|
          redirect_to customer_review_order_path,
            notice: 'Your order was delivered by ' + payload
        end

      ensure
        conn.async_exec "UNLISTEN *"
      end
    end
  end

  def index; end

  def order; end

  def cart; end

  def complete_order; end

  def review; end

  def history; end

  def reviews; end

  def promotions; end
end
