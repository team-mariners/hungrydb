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

    def getriderid
        if params.has_key?(:username)
            userid = helpers.get_user_id(params[:username])
            if (userid && helpers.user_has_role?(userid, 'rider'))
                render plain: userid
            else
                render plain: false
            end
        else
            render plain: false
        end
    end

    def updaterole
        if (params.has_key?(:userid) && params.has_key?(:oldrole) && params.has_key?(:newrole))
            if (helpers.get_user_role(params[:userid]) == params[:oldrole])
                if (params[:newrole] == 'rider' && params.has_key?(:roleattr))
                    # Create the rider's subclasses at the same time as the role assignment
                    riderattr = params[:roleattr]
                    create = helpers.create_rider(
                        params[:userid],
                        riderattr[:ridertype],
                        riderattr[:salary]
                    )
                    render plain: create
                elsif (params[:newrole] == 'manager' && params.has_key?(:roleattr) && params[:roleattr][:rupdate])
                    helpers.set_role(params[:userid], params[:newrole])

                    # Create the restaurant at the same time as the role assignment
                    restaurant = params[:roleattr]
                    create = helpers.create_restaurant(
                        restaurant[:rname],
                        restaurant[:rmincost],
                        restaurant[:raddress],
                        params[:userid]
                    )
                    render plain: create
                else
                    helpers.set_role(params[:userid], params[:newrole])
                    render plain: true
                end
            else
                render plain: false
            end
        else
            render plain: false
        end
    end

    def updateschedule
        if (params.has_key?(:rid) && params.has_key?(:schedule))
            render plain: helpers.update_rider_schedule(params[:rid], params[:schedule])
        else
            render plain: false
        end
    end

    def fdspromo
        if (params.has_key?(:func) && params.has_key?(:code) && params.has_key?(:start) && params.has_key?(:end) && params.has_key?(:percent) && params.has_key?(:max))
            if (params[:func] == 'new' && params.has_key?(:name) )
                render plain: helpers.create_fds_promo(params[:name], params[:code], params[:start], params[:end], params[:percent], params[:max])
            elsif (params[:func] == 'edit')
                if helpers.fds_promo_exist?(params[:code])
                    render plain: helpers.edit_fds_promo(params[:code], params[:start], params[:end], params[:percent], params[:max])
                else
                    render plain: false
                end
            end
        else
            render plain: false
        end
    end

    def getstatistics
        if (params.has_key?(:type))
            if (params[:type] == 'site' && params.has_key?(:month))
                render json: helpers.get_site_statistics(params[:month])
            elsif (params[:type] == 'delivery' && params.has_key?(:month))
                if (params.has_key?(:riderid) && params[:riderid] != '')
                    render json: helpers.get_delivery_statistics_for_rider(params[:riderid], params[:month])
                else
                    render json: helpers.get_delivery_statistics(params[:month])
                end
            else
                render plain: false
            end
        else
            render plain: false
        end
    end
end
