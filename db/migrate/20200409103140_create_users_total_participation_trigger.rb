class CreateUsersTotalParticipationTrigger < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL
      CREATE OR REPLACE FUNCTION check_subchild_exists(record users) RETURNS boolean AS $$
      DECLARE
        u_role varchar(100);
        is_exist boolean DEFAULT false;
      BEGIN
        SELECT roles INTO u_role
        FROM users
        WHERE id = record.id;

        EXECUTE format('SELECT true FROM %Is WHERE user_id = $1', u_role)
          INTO is_exist
          USING record.id;

        RETURN is_exist;
      END;
      $$ LANGUAGE plpgsql;

      CREATE OR REPLACE FUNCTION check_subchild_exists() RETURNS TRIGGER AS $$
      DECLARE
        u_id bigint;
        record users;
        is_exists boolean;        
        is_subchild_exists boolean DEFAULT false;
      BEGIN
        -- Insert or update of users  
        IF (TG_TABLE_NAME = 'users') THEN
          u_id = NEW.id;
          record = NEW;
        ELSE
          -- Delete or update of user_id of subtables          
          u_id = OLD.id;
          record = OLD;          
        END IF;

        -- Check if the users table still have the user entry
        SELECT true INTO is_exists
        FROM users
        WHERE id = u_id;

        IF FOUND THEN
          is_subchild_exists = check_subchild_exists(record);

          IF NOT is_subchild_exists THEN
            RAISE exception 'A user must have the corresponding entry in its subtables';
          END IF;
        END IF;

        RETURN NULL;
      END;      
      $$ LANGUAGE plpgsql;    

      DROP TRIGGER IF EXISTS check_users_total_participation ON users CASCADE;
      CREATE CONSTRAINT TRIGGER check_users_total_participation
        AFTER INSERT OR UPDATE of id, roles ON users
        DEFERRABLE INITIALLY DEFERRED
        FOR EACH ROW
        EXECUTE PROCEDURE check_subchild_exists();
    SQL

    subtables = ["admins", "customers", "riders", "managers"]

    subtables.each do |table|
      execute "DROP TRIGGER IF EXISTS check_users_total_participation_#{table} ON #{table} CASCADE;
        CREATE CONSTRAINT TRIGGER check_users_total_participation_#{table}
        AFTER DELETE OR UPDATE of user_id ON #{table}
        DEFERRABLE INITIALLY DEFERRED
        FOR EACH ROW
        EXECUTE PROCEDURE check_subchild_exists();"
    end
  end

  def down
    subtables = ["admins", "customers", "riders", "managers"]

    subtables.each do |table|
      execute "DROP TRIGGER check_users_total_participation_#{table} ON #{table} CASCADE;"
    end

    execute <<-SQL
      DROP TRIGGER check_users_total_participation ON users CASCADE;
      DROP FUNCTION check_subchild_exists();
      DROP FUNCTION check_subchild_exists(users);
    SQL
  end
end
