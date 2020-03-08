module UsersHelper
  def current_user_has_role?(role)
    return user_has_role?(current_user.id, role)
  end

  def user_has_role?(userid, role)
    user = User.find_by(id: userid)
    rolelist = user.roles.split(',')

    if rolelist.include?(role)
      return true
    else
      return false
    end
  end

  def is_valid_role?(role)
    # This list has to be updated manually if new roles are introduced
    rolelist = ["customer", "rider", "manager", "admin"]

    if rolelist.include?(role)
      return true
    else
      return false
    end
  end

  def get_user_id(username)
    user = User.find_by(username: username)

    if user == nil
      return false
    else
      return user.id
    end
  end

  # Returns a customised user which only consists of attributes that are chosen to be exposed.
  def get_user_hash(user)
    userHash = {id: user.id, username: user.username, email: user.email, roles: user.roles}
  end

  def get_current_user_role_attributes(role)
    return get_user_role_attributes(current_user.id, role)
  end

  def get_user_role_attributes(userid, role)
    if !user_has_role?(userid, role)
      return false
    elsif !is_valid_role?(role)
      return false
    else
      return role.capitalize.constantize.find_by(
        user_id: userid
      )
    end
  end
end
