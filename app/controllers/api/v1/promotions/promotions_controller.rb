# frozen_string_literal: true

class Api::V1::Promotions::PromotionsController < Api::V1::BaseController
  before_action :get_restaurant, only: %i[index_restaurant create]

  def index
    res_promos_hash = {}
    restaurants = helpers.retrieve_restaurants_id_name().to_a
    
    restaurants.each do |res|
      # Create hash of { rname => array of promotions }
      res_promos_hash[res['name']] = helpers.retrieve_restaurant_promos(res['id'])
    end

    render json: { 'fds_promos': helpers.retrieve_fds_promos,
                 'restaurant_promos': res_promos_hash }
  end

  # Retrieve the promotions of the current restaurant (for manager's account)
  def index_restaurant
    promotions = ActiveRecord::Base.connection.exec_query(
      "SELECT *
      FROM promotions
        WHERE id IN (
        SELECT restaurant_promotion_id
        FROM has_promotions
        WHERE restaurant_id = #{@restaurant['id']}
        )
      ORDER BY id;"
    ).to_a

    promotions.each do |row|
      format_promotion_row(row)
    end

    render json: promotions
  end

  # Create new promotion
  def create
    write(:create)
  end


  private 

  def write(type)
    filtered_params = promotions_params
    promotion = nil

    begin
      if type == :create
        promotion = write_create(filtered_params)
      end
    
      render json: promotion
    rescue ActiveRecord::RecordNotUnique
      render json: {errors: "Promotion name or promocode already exists!"}, status: 500
    rescue => error
      render json: {errors: error.message}, status: 500
    end
  end

  def write_create(filtered_params)
    ActiveRecord::Base.connection.begin_db_transaction

    ActiveRecord::Base.connection.exec_query(
        "INSERT INTO Promotions(p_name, p_type, promocode, max_redeem, start_datetime, end_datetime, percentage)
        VALUES ('#{filtered_params['p_name']}', 'restaurant', '#{filtered_params['promocode']}',
          #{filtered_params['max_redeem']}, '#{filtered_params['start_datetime']}', '#{filtered_params['end_datetime']}'
          , #{filtered_params['percentage']});"
    )

    new_promo = ActiveRecord::Base.connection.exec_query(
        "SELECT * FROM Promotions
        WHERE promocode = '#{filtered_params['promocode']}'"
    ).to_a[0]

    ActiveRecord::Base.connection.exec_query(
        "INSERT INTO restaurant_promotions(promotion_id, p_type)
        VALUES (#{new_promo['id']}, 'restaurant');"
    )

    ActiveRecord::Base.connection.exec_query(
        "INSERT INTO has_promotions(restaurant_id, restaurant_promotion_id)
        VALUES (#{@restaurant['id']}, #{new_promo['id']});"
    )

    ActiveRecord::Base.connection.commit_db_transaction

    return new_promo
  end

  def promotions_params
    params.require(:promotion).permit(:p_name, :promocode, :percentage, :max_redeem, 
      :start_datetime, :end_datetime)
  end


  def get_restaurant
    @restaurant = helpers.get_restaurant(current_user)
  end    

  def format_promotion_row(row)
    row["start_datetime"] = row["start_datetime"].in_time_zone
    row["end_datetime"] = row["end_datetime"].in_time_zone
  end
end
