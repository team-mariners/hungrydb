class CreatePromotions < ActiveRecord::Migration[6.0]
  def up
    execute "CREATE TYPE promo_type AS ENUM ('fds', 'restaurant');"

    execute "CREATE SEQUENCE promotions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;"

    execute "CREATE TABLE promotions (
      id bigint NOT NULL DEFAULT nextval('promotions_id_seq'),
      p_type promo_type NOT NULL,
      promocode varchar(200) UNIQUE NOT NULL,
      num_redeemed integer NOT NULL DEFAULT 0
        CONSTRAINT promotions_num_redeemed
        CHECK((num_redeemed >= 0) AND (num_redeemed <= max_redeem)),
      max_redeem integer NOT NULL
        CONSTRAINT promotions_max_redeem
        CHECK(max_redeem >= 0),
      start_date timestamp without time zone NOT NULL
        CONSTRAINT promotions_start_date
        CHECK(start_date >= 'now'),
      end_date timestamp without time zone NOT NULL
        CONSTRAINT promotions_end_date
        CHECK(end_date > start_date),
      percentage integer NOT NULL
        CHECK((percentage >= 0) AND (percentage <= 100)),
      PRIMARY KEY (id),
      UNIQUE(id, p_type)
    );"

    execute "ALTER SEQUENCE promotions_id_seq OWNED BY promotions.id;"
  end

  def down
    execute "DROP TABLE promotions;"
    execute "DROP TYPE promo_type CASCADE"  
  end
end
