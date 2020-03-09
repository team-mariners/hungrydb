# frozen_string_literal: true

class CustomersController < UsersController
  before_action do
    if !helpers.current_user_has_role?('customer')
      return_unauthorized
    end
  end

  def index; end

  def history; end

  def reviews; end

  def promotions; end
end
