class UsersController < ApplicationController
  def index
    roles = current_user.roles

    if helpers.user_has_role?('manager')
      render 'managers/index'
    elsif helpers.user_has_role?('admin')
      render 'admins/index'
    end
  end
end
