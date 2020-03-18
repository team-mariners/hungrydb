module UsersHelper
  def current_user_has_role?(role)
    return user_has_role?(current_user.id, role)
  end

  def user_has_role?(userid, role)
    if (role == get_user_role(userid))
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
    userid = ActiveRecord::Base.connection.exec_query(
      "SELECT id FROM users
      WHERE username = '#{username}';"
    ).first

    if userid == nil
      return false
    else
      return userid['id']
    end
  end

  def get_user_name(userid)
    username = ActiveRecord::Base.connection.exec_query(
      "SELECT username FROM users
      WHERE id = '#{userid}';"
    ).first

    if username == nil
      return false
    else
      return username['username']
    end
  end

  def get_user_role(userid)
    user_role = ActiveRecord::Base.connection.exec_query(
      "SELECT roles FROM users
      WHERE id = #{userid}"
    ).first

    if (user_role == nil)
      return false
    else
      return user_role['roles']
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
      return ActiveRecord::Base.connection.exec_query(
        "SELECT * FROM #{role}s
        WHERE user_id = #{userid};"
      ).to_a[0]
    end
  end
end
