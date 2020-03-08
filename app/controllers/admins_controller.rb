class AdminsController < UsersController
    skip_before_action :verify_authenticity_token

    before_action do
        if !helpers.current_user_has_role?('admin')
            return_unauthorized
        end
    end

    def index
    end

    def getuserid
        if params.has_key?(:username)
            render plain: helpers.get_user_id(params[:username])
        else
            render plain: false
        end
    end
end
