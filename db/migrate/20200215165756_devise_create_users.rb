# frozen_string_literal: true

class DeviseCreateUsers < ActiveRecord::Migration[6.0]
  def up
    execute "CREATE SEQUENCE users_id_seq
      START WITH 1
      INCREMENT BY 1
      NO MINVALUE
      NO MAXVALUE
      CACHE 1;"

    execute "CREATE TABLE users (
      id bigint NOT NULL DEFAULT nextval('users_id_seq'),
      username character varying DEFAULT ''::character varying NOT NULL,
      email character varying DEFAULT ''::character varying NOT NULL,
      encrypted_password character varying DEFAULT ''::character varying NOT NULL,
      roles character varying DEFAULT ''::character varying,
      reset_password_token character varying,
      reset_password_sent_at timestamp without time zone,
      remember_created_at timestamp without time zone,
      sign_in_count integer DEFAULT 0 NOT NULL,
      current_sign_in_at timestamp without time zone,
      last_sign_in_at timestamp without time zone,
      current_sign_in_ip inet,
      last_sign_in_ip inet,
      created_at timestamp(6) without time zone NOT NULL,
      updated_at timestamp(6) without time zone NOT NULL,
      PRIMARY KEY(id),
      UNIQUE(id, roles)
    );"

    execute "ALTER SEQUENCE users_id_seq OWNED BY users.id;"

    execute "CREATE UNIQUE INDEX index_users_on_email ON users USING btree (email);"

    execute "CREATE UNIQUE INDEX index_users_on_reset_password_token ON users USING btree (reset_password_token);"

    execute "CREATE UNIQUE INDEX index_users_on_username ON users USING btree (username);"
  end

  def down
    execute "DROP TABLE users;"
    execute "DROP INDEX index_users_on_email;"
    execute "DROP INDEX index_users_on_reset_password_token;"
    execute "DROP INDEX index_users_on_username;"
  end
end
