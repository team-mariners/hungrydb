# frozen_string_literal: true

module Api::V1::Promotions::PromotionsHelper
  def retrieve_fds_promos
    fds_promos_query = "SELECT *
                        FROM Promotions P INNER JOIN FDS_Promotions F
                             ON (P.id = F.promotion_id)
                        ORDER BY P.promocode"
    ActiveRecord::Base.connection.execute(fds_promos_query)
  end

  def retrieve_restaurants_id_name()
    res_id_query = "SELECT DISTINCT id, name
                   FROM Restaurants
                   ORDER BY name"
    ActiveRecord::Base.connection.execute(res_id_query)
  end

  def retrieve_restaurant_promos(rid)
    res_promos_query = "SELECT P.id, P.p_name, P.promocode, P.num_redeemed,
                               P.max_redeem, P.start_datetime, P.end_datetime, P.percentage
                       FROM Has_Promotions H INNER JOIN Promotions P
                            ON H.restaurant_id = #{rid}
                               and H.restaurant_promotion_id = P.id
                               and CURRENT_TIMESTAMP >= P.start_datetime
                               and CURRENT_TIMESTAMP <= P.end_datetime
                       ORDER BY P.promocode"
    ActiveRecord::Base.connection.execute(res_promos_query)
  end

  def retrieve_promo_code(pid)
    if pid == nil
      return nil
    end

    promo_discount_query = "SELECT promocode
                           FROM Promotions
                           WHERE id = #{pid}
                           LIMIT 1"
                           
    ActiveRecord::Base.connection.execute(promo_discount_query)[0]['promocode']
  end

  def retrieve_promo_discount(pid)
    if pid == nil
      return nil
    end

    promo_discount_query = "SELECT percentage
                           FROM Promotions
                           WHERE id = #{pid}
                           LIMIT 1"
    ActiveRecord::Base.connection.execute(promo_discount_query)[0]['percentage']
  end
end
