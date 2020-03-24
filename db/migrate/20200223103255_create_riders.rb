# frozen_string_literal: true

class CreateRiders < ActiveRecord::Migration[6.0]
  def change
    create_table :riders do |t|
      t.belongs_to :user, index: { unique: true }, foreign_key: "id"
      t.string :currLocation
      t.string :status
      t.float :fee

      t.timestamps
    end
  end

<<<<<<< HEAD
  def up
    execute "CREATE TABLE riders (
      id bigint NOT NULL,
      currLocation varchar(300) NOT NULL,
      status varchar(300) NOT NULL,
      comission numeric NOT NULL,
      PRIMARY KEY(id),
      FOREIGN KEY(id) REFERENCES users
        ON DELETE CASCADE
    );"

    # This will auto drop the sequence when Riders is dropped
    execute "ALTER SEQUENCE riders_id_seq OWNED BY riders.id;"
  end

  # For rolling back
  def down
    execute "DROP TABLE riders;"
  end
=======
  # def up
  #   execute "CREATE TABLE riders (
  #     id bigint NOT NULL,
  #     currLocation varchar(300) NOT NULL,
  #     status varchar(300) NOT NULL,
  #     comission numeric NOT NULL,
  #     PRIMARY KEY(id),
  #     FOREIGN KEY(id) REFERENCES users
  #       ON DELETE CASCADE
  #   );"

  #   # This will auto drop the sequence when Riders is dropped
  #   execute "ALTER SEQUENCE riders_id_seq OWNED BY riders.id;"
  # end

  # # For rolling back
  # def down
  #   execute "DROP TABLE riders;"
  # end
>>>>>>> 3f7baa0428d769711f1ae72096160ba5b7c4b50b
end
