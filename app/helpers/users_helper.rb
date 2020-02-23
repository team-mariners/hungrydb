module UsersHelper
    protected def has_role(role)
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
end
