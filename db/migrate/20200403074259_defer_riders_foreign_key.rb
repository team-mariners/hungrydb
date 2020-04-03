class DeferRidersForeignKey < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL
      ALTER TABLE full_time_riders ALTER CONSTRAINT full_time_riders_id_fkey DEFERRABLE INITIALLY DEFERRED;
      ALTER TABLE part_time_riders ALTER CONSTRAINT part_time_riders_id_fkey DEFERRABLE INITIALLY DEFERRED;
    SQL
  end

  def down
    execute <<-SQL
      ALTER TABLE full_time_riders ALTER CONSTRAINT full_time_riders_id_fkey NOT DEFERRABLE;
      ALTER TABLE part_time_riders ALTER CONSTRAINT part_time_riders_id_fkey NOT DEFERRABLE;
    SQL
  end
end
