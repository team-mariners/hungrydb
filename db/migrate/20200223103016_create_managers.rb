# frozen_string_literal: true

class CreateManagers < ActiveRecord::Migration[6.0]
  def up
    execute "CREATE SEQUENCE managers_id_seq
      START WITH 1
      INCREMENT BY 1
      NO MINVALUE
      NO MAXVALUE
      CACHE 1;"

    execute "CREATE TABLE managers (
      id bigint NOT NULL DEFAULT nextval('managers_id_seq'),
      user_id bigint,
      created_at timestamp(6) without time zone NOT NULL,
      updated_at timestamp(6) without time zone NOT NULL,
      PRIMARY KEY(id),
      FOREIGN KEY (user_id) REFERENCES users ON DELETE CASCADE
    );"

    execute "ALTER SEQUENCE managers_id_seq OWNED BY managers.id;"

    execute "CREATE UNIQUE INDEX index_managers_on_user_id ON managers USING btree (user_id);"
  end

  def down
    execute "DROP TABLE managers;"
    execute "DROP INDEX index_managers_on_user_id;"
  end
end
