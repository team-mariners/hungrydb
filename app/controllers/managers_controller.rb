class ManagersController < UsersController
  before_action :verify_url

  before_action do
    verify_role!('manager')
  end

  def index
  end

  private

  def verify_url
    # current_uri = request.env['PATH_INFO']
    # print current_uri

    # # Check if the given food category id exist or not before going to the respective food category page
    # if current_uri.match(/^\/manager\/manage_menu\/food_category\/\S+$/)
    #   id = params[:name]
    #   begin
    #     FoodCategory.find(id)
    #   rescue
    #     raise ActionController::RoutingError, 'Does not exist'
    #   end  
    # end
  end
end
