class ManagersController < UsersController
  before_action do
    if !helpers.user_has_role?('manager')
      return_unauthorized
    end
  end

  def index
  end
end
