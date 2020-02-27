module UsersHelper
    def user_has_role?(role)
        if !user_signed_in?
            return false
        end

      rolelist = current_user.roles.split(',')

      if rolelist.include?(role)
        return true
      else
        return false
      end
    end

    # Returns a customised user which only consists of attributes that are chosen to be exposed.
    def get_user_hash(user)
      userHash = {id: user.id, username: user.username, email: user.email, roles: user.roles}
    end

    def get_role_attributes(role)
        if !user_has_role?(role)
            return false
        else
            return role.capitalize.constantize.find_by(
                user_id: current_user.id
            )
        end
    end
end
