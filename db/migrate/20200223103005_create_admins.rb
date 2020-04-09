# frozen_string_literal: true

class CreateAdmins < ActiveRecord::Migration[6.0]
  def up
    execute "CREATE SEQUENCE admins_id_seq
      START WITH 1
      INCREMENT BY 1
      NO MINVALUE
      NO MAXVALUE
      CACHE 1;"

    execute "CREATE TABLE admins (
      id bigint NOT NULL DEFAULT nextval('admins_id_seq'),
      user_id bigint,
      created_at timestamp(6) without time zone NOT NULL,
      updated_at timestamp(6) without time zone NOT NULL,
      PRIMARY KEY(id),
      FOREIGN KEY(user_id, role) REFERENCES users(id, roles) ON DELETE CASCADE
    );"

    execute "ALTER SEQUENCE admins_id_seq OWNED BY admins.id;"

    execute "CREATE UNIQUE INDEX index_admins_on_user_id ON admins USING btree (user_id);"
  end

  def down
    execute "DROP TABLE admins;"
    execute "DROP INDEX index_admins_on_user_id;"
  end
end
