class UsersController < ApplicationController
  def index
    if helpers.current_user_has_role?('manager')
      render 'managers/index'
    elsif helpers.current_user_has_role?('admin')
      render 'admins/index'
    elsif helpers.current_user_has_role?('customer')
      render 'customers/index'
    end
  end
end
