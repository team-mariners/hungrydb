# frozen_string_literal: true

module Api::V1::Promotions::FdsPromotionsHelper
  def retrieve_fds_promos
		fds_promos_query = "SELECT *
                        FROM Promotions P INNER JOIN FDS_Promotions F
                             ON (P.id = F.promotion_id)
                        ORDER BY P.promocode"
		ActiveRecord::Base.connection.execute(fds_promos_query)
  end
end
