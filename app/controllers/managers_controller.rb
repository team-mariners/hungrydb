class ManagersController < UsersController
  before_action :verify_url

  before_action do
    verify_role!('manager')
  end

  def index
  end

  private

  def verify_url
    current_uri = request.env['PATH_INFO']
    print current_uri

    # Check if the given menu section id exist or not before going to the respective menu section page
    if current_uri.match(/^\/manager\/manage_menu\/menu_sections\/-?\d+$/)
      id = params[:id]

      result = ActiveRecord::Base.connection.exec_query(
        "SELECT 1
        FROM menu_sections
        WHERE url_id = #{id}"
      )

      if result.empty?
        raise ActionController::RoutingError, 'Does not exist'
      end
    end
  end
end
