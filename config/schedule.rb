# Use this file to easily define all of your cron jobs.
#
# It's helpful, but not entirely necessary to understand cron before proceeding.
# http://en.wikipedia.org/wiki/Cron

# Example:
#
# set :output, "/path/to/my/cron_log.log"
#
# every 2.hours do
#   command "/usr/bin/some_great_command"
#   runner "MyModel.some_method"
#   rake "some:great:rake:task"
# end
#
# every 4.days do
#   runner "AnotherModel.prune_old_records"
# end

# Learn more: http://github.com/javan/whenever

require File.expand_path('../config/environment', __dir__)

# Following Singapore Timezone
every :day, at: Time.zone.parse('12:00am') do
    rake "database:reset_num_orders"
end

every :month do
    rake "database:create_full_time_riders_salary"
end

every :week do
    rake "database:create_part_time_riders_salary"
end