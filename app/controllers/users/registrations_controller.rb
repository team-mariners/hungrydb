# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  skip_before_action :verify_authenticity_token
  # before_action :configure_sign_up_params, only: [:create]
  # before_action :configure_account_update_params, only: [:update]

  # GET /resource/sign_up
  # def new
  #    super
  # end

  # POST /resource
  def create
    build_resource(sign_up_params)

    # To deal with duplicated username, as username is only marked
    # unique but it's not a primary key.
    begin
      resource.save
    rescue ActiveRecord::RecordNotUnique
    end

    yield resource if block_given?
    if resource.persisted?
      if resource.active_for_authentication?
        set_flash_message! :notice, :signed_up
        sign_up(resource_name, resource)
        respond_with resource, location: after_sign_up_path_for(resource)
      else
        set_flash_message! :notice, :"signed_up_but_#{resource.inactive_message}"
        expire_data_after_sign_in!
        respond_with resource, location: after_inactive_sign_up_path_for(resource)
      end
    else
      clean_up_passwords resource
      set_minimum_password_length
      render plain: "Username or email already exists", status: 400
    end

    # Automatically grant the new user as a customer
    helpers.set_role(@user.id, "customer")
  end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  def update
    if params.has_key?(:id)
      if params.has_key?(:email)
        ActiveRecord::Base.connection.exec_query(
          "UPDATE users SET email = '#{params[:email]}', updated_at = 'now'
          WHERE id = '#{params[:id]}';"
        )
        render plain: true
      elsif params.has_key?(:curPassword) && params.has_key?(:newPassword)
        user = User.find_for_authentication(id: params[:id])

        if user.valid_password?(params[:curPassword])
          ActiveRecord::Base.connection.exec_query(
            "UPDATE users SET
            encrypted_password = '#{Devise::Encryptor.digest(User, params[:newPassword])}',
            updated_at = 'now'
            WHERE id = '#{params[:id]}';"
          )
          bypass_sign_in user
          render plain: true
        else
          render plain: false
        end
      elsif params.has_key?(:can) && params.has_key?(:cvv)
        if (!helpers.user_has_role?(params[:id], 'customer'))
          render plain: false
        else
          ActiveRecord::Base.connection.exec_query(
            "UPDATE customers SET
            can = '#{params[:can]}', cvv = '#{params[:cvv]}',
            updated_at = 'now'
            WHERE user_id = #{params[:id]};"
          )
          render plain: true
        end
      else
        render plain: false
      end
    else
      render plain: false
    end
  end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_up_params
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute])
  # end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.permit(:account_update, keys: [:attribute])
  # end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end
end
