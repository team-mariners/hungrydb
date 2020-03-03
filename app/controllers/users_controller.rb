class UsersController < ApplicationController
  def index
    roles = current_user.roles

    if helpers.user_has_role?('manager')
      render 'managers/index'
    elsif helpers.user_has_role?('admin')
      render 'admins/index'
    elsif helpers.user_has_role?('customer')
      render 'customers/index'
    end
  end
end
