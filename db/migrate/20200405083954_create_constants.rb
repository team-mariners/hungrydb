class CreateConstants < ActiveRecord::Migration[6.0]
  def up
    execute "CREATE TABLE constants (
      c_key varchar(200) NOT NULL,
      value varchar(200)
    );"          
  end

  def down
    execute "DROP TABLE Constants CASCADE;"
  end
end
