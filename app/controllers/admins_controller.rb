class AdminsController < UsersController
    before_action do
        if !helpers.user_has_role?('admin')
            return_unauthorized
        end
    end

    def index
    end
end
