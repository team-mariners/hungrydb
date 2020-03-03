class ApplicationController < ActionController::Base
    before_action :configure_permitted_parameters, if: :devise_controller?
    # Other than exceptions, throws null session due to requesting json
    protect_from_forgery with: :null_session

    protected

    def configure_permitted_parameters
      added_attrs = [:username, :email, :password, :password_confirmation, :remember_me]
      devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
      devise_parameter_sanitizer.permit :account_update, keys: added_attrs
    end

    def return_unauthorized
      render :file => "public/401.html", :status => :unauthorized
    end

    def verify_role!(role)
      if !helpers.user_has_role?(role)
        return_unauthorized
      end
    end
end
