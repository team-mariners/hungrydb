# frozen_string_literal: true

class CreateCustomers < ActiveRecord::Migration[6.0]
  def up
    execute "CREATE SEQUENCE customers_id_seq
      START WITH 1
      INCREMENT BY 1
      NO MINVALUE
      NO MAXVALUE
      CACHE 1;"

    execute "CREATE TABLE customers (
      id bigint NOT NULL DEFAULT nextval('customers_id_seq'),
      user_id bigint,
      can bigint,
      cvv integer,
      reward_points integer DEFAULT 0 NOT NULL,
      created_at timestamp(6) without time zone NOT NULL,
      updated_at timestamp(6) without time zone NOT NULL,
      PRIMARY KEY(id),
      FOREIGN KEY (user_id) REFERENCES users ON DELETE CASCADE
    );"

    execute "ALTER SEQUENCE customers_id_seq OWNED BY customers.id;"

    execute "CREATE UNIQUE INDEX index_customers_on_user_id ON customers USING btree (user_id);"
  end

  def down
    execute "DROP TABLE customers;"
    execute "DROP INDEX index_customers_on_user_id;"
  end
end
