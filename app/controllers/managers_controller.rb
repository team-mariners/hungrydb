class ManagersController < UsersController
    before_action do
        verify_role!('manager')
    end

    def index
    end
end
