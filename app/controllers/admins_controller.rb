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

    def updaterole
        if (params.has_key?(:userid) && params.has_key?(:oldrole) && params.has_key?(:newrole))
            if (helpers.get_user_role(params[:userid]) == params[:oldrole])
                helpers.set_role(params[:userid], params[:newrole])
                render plain: true
            else
                render plain: false
            end
        else
            render plain: false
        end
    end
end
