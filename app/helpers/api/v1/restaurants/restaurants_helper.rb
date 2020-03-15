# frozen_string_literal: true

module Api::V1::Restaurants::RestaurantsHelper
  def get_restaurants
		restaurants_query = "SELECT *
												FROM Restaurants
                        ORDER BY name"
		ActiveRecord::Base.connection.execute(restaurants_query)
  end

  def get_menu_sections(rid)
    menu_sec_query = "SELECT DISTINCT url_id, ms_name
                     FROM menu_sections
                     WHERE restaurant_id = #{rid}"
    ActiveRecord::Base.connection.execute(menu_sec_query)
  end

  def get_section_food(rid, ms_id)
		sec_food_query = "SELECT DISTINCT F.f_name, F.price
                      FROM menu_sections M INNER JOIN Foods F
                           ON M.restaurant_id = #{rid} and M.url_id = #{ms_id}
                              and F.ms_url_id = M.url_id
                              and F.num_orders < F.daily_limit
                      ORDER BY F.f_name"
		ActiveRecord::Base.connection.execute(sec_food_query)
  end
end
