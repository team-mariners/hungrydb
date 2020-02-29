module ManagersHelper
  def get_manager_info_bundle()
    # Get the current user, manager, and restaurant
    user = current_user
    manager = Manager.find_by(user_id: user.id)
    restaurant = manager.restaurant
    # manager = Manager.find_by_sql("SELECT * FROM managers WHERE user_id = #{user.id} LIMIT 1")[0]
    # restaurant = Restaurant.find_by_sql("SELECT * FROM restaurants WHERE manager_id = #{manager.id} LIMIT 1")[0]
    
    # Customise the object to return to the view
    user_hash = get_user_hash(user)
    user_hash["manager_id"] = manager.id

    # Return the object
    result = {manager: user_hash, restaurant: restaurant}
  end
end