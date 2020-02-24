class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    @user = current_user
    roles = @user.roles
    if roles.include? 'manager'
      render 'managers/index'
    end
  end
end
