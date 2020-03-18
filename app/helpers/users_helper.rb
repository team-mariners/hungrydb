module UsersHelper
  def current_user_has_role?(role)
    return user_has_role?(current_user.id, role)
  end

  def user_has_role?(userid, role)
    user_role = ActiveRecord::Base.connection.exec_query(
      "SELECT roles FROM users
      WHERE id = #{user.id}"
    ).to_a[0]

    if (role == user_role)
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
      WHERE username = #{username}"
    ).to_a[0]

    if userid == nil
      return false
    else
      return userid
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
        "SELECT * FROM #{role}
        WHERE user_id = #{userid}"
      ).to_a[0]
    end
  end
end
