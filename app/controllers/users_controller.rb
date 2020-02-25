class UsersController < ApplicationController
  def index
    roles = current_user.roles

    if roles.include? 'manager'
      render 'managers/index'
    end
  end
end
