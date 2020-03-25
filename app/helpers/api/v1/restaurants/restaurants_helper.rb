# frozen_string_literal: true

module Api::V1::Restaurants::RestaurantsHelper
  def retrieve_restaurants
    restaurants_query = "SELECT *
                        FROM Restaurants
                        ORDER BY name"
    ActiveRecord::Base.connection.execute(restaurants_query)
  end

  def retrieve_menu_sections(rid)
    menu_sec_query = "SELECT DISTINCT url_id, ms_name
                     FROM menu_sections
                     WHERE restaurant_id = #{rid}"
    ActiveRecord::Base.connection.execute(menu_sec_query)
  end

  def retrieve_section_food(rid, ms_id)
    sec_food_query = "SELECT DISTINCT F.f_name, F.price, F.num_orders, F.daily_limit
                     FROM menu_sections M INNER JOIN Foods F
                     ON M.restaurant_id = #{rid} and M.url_id = #{ms_id}
                        and F.ms_url_id = M.url_id
                        and F.is_active = true
                        and F.num_orders < F.daily_limit
                     ORDER BY F.f_name"
    ActiveRecord::Base.connection.execute(sec_food_query)
  end

  def retrieve_restaurant_name(rid)
    restaurant_name_query = "SELECT name
                            FROM Restaurants
                            WHERE id = #{rid}
                            LIMIT 1"
    ActiveRecord::Base.connection.execute(restaurant_name_query)[0]['name']
  end

  def retrieve_restaurant_reviews(rid)
    curr_res_review_query = "SELECT R.oid, R.rider_id, R.rider_rating, R.food_review
                            FROM Reviews R INNER JOIN Orders O
                                 ON R.oid = O.oid and O.restaurant_id = #{rid}
                            ORDER BY O.date_time"
    ActiveRecord::Base.connection.execute(curr_res_review_query)
  end
end
