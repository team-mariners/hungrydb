module ManagersHelper
  def get_manager_info_bundle()
    # Get the current user, manager, and restaurant
    user = current_user

    manager = ActiveRecord::Base.connection.exec_query(
      "SELECT *
      FROM managers
      WHERE user_id = #{user.id}"
    ).to_a[0]

    restaurant = ActiveRecord::Base.connection.exec_query(
      "SELECT *
      FROM restaurants
      WHERE manager_id = #{manager["id"]}"
    ).to_a[0]

    # Customise the hash that is returned to the view
    user_hash = get_user_hash(user)
    user_hash["manager_id"] = manager["id"]

    # Return the object
    result = {manager: user_hash, restaurant: restaurant}
  end
end