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

                # Create the restaurant at the same time as the role assignment
                if (params[:newrole] == 'manager' && params.has_key?(:roleattr) && params[:roleattr][:rupdate])
                    restaurant = params[:roleattr]
                    create = helpers.create_restaurant(
                        restaurant[:rname],
                        restaurant[:rmincost],
                        restaurant[:raddress],
                        params[:userid]
                    )
                    render plain: create
                elsif (params[:newrole] == 'rider' && params.has_key?(:roleattr))
                    render plain: true
                else
                    render plain: true
                end
            else
                render plain: false
            end
        else
            render plain: false
        end
    end
end
