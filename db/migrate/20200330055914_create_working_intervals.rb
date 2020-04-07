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
        wi_id bigint NOT NULL PRIMARY KEY DEFAULT nextval('wi_id_seq'),
        workingDay day_of_week NOT NULL,
        startHour time NOT NULL,                    
        endHour time NOT NULL,                    
        wws_id bigint NOT NULL REFERENCES weekly_work_schedules
            ON DELETE CASCADE,
        CONSTRAINT duration CHECK (endHour - startHour <= '4 hours'),
        CONSTRAINT start_and_end_on_hour
          CHECK ((EXTRACT(MINUTE FROM startHour) = 0) AND (EXTRACT(MINUTE FROM endHour) = 0)),
        CONSTRAINT end_hour CHECK (endhour > startHour),
        CONSTRAINT operating_hours CHECK (startHour >= time '10:00' AND endHour <= time '22:00')
      );

      ALTER SEQUENCE wi_id_seq OWNED BY working_intervals.wi_id;
    SQL
  end

  # For rolling back
  # Need to drop the sequence too
  def down
    execute <<-SQL
      DROP TABLE working_intervals;
    SQL
  end
end
