# frozen_string_literal: true

class CreateWorkingIntervals < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL
      CREATE TYPE day_of_week AS ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');

      CREATE SEQUENCE wi_id_seq
      START WITH 1
      INCREMENT BY 1
      NO MINVALUE
      NO MAXVALUE
      CACHE 1;

      CREATE TABLE working_intervals (
        wi_id bigint NOT NULL DEFAULT nextval('wi_id_seq'),
        workingDay day_of_week NOT NULL,
        startHour time NOT NULL,
        endHour time NOT NULL,
        wws_id bigint NOT NULL,
        PRIMARY KEY(wi_id),
        FOREIGN KEY(wws_id) REFERENCES weekly_work_schedules
            ON DELETE CASCADE
      );

      ALTER SEQUENCE wi_id_seq OWNED BY working_intervals.wi_id;
    SQL
  end

  # For rolling back
  def down
    execute "DROP TABLE working_intervals;"
  end
end
