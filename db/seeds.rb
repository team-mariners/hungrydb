# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


ActiveRecord::Base.connection.exec_query(
    "INSERT INTO constants(c_key, value) VALUES ('COMMISSION', 1.2)"
)

# Create test users with multiple roles
ActiveRecord::Base.connection.exec_query(
    "INSERT INTO users(username, encrypted_password, email, roles, created_at, updated_at) VALUES
    ('customer', '#{Devise::Encryptor.digest(User, "12345678")}', 'customer@example.com', 'customer', 'now', 'now'),
    ('JohnDoe', '#{Devise::Encryptor.digest(User, "12345678")}', 'johnDoe@example.com', 'customer', 'now', 'now'),
    ('rider', '#{Devise::Encryptor.digest(User, "12345678")}', 'rider@example.com', 'rider', 'now', 'now'),
    ('rider2', '#{Devise::Encryptor.digest(User, "12345678")}', 'rider2@example.com', 'rider', 'now', 'now'),
    ('manager', '#{Devise::Encryptor.digest(User, "12345678")}', 'manager@example.com', 'manager', 'now', 'now'),
    ('manager2', '#{Devise::Encryptor.digest(User, "12345678")}', 'manager2@example.com', 'manager', 'now', 'now'),
    ('admin', '#{Devise::Encryptor.digest(User, "12345678")}', 'admin@example.com', 'admin', 'now', 'now');"
)

# ------------------------------------------------ Customers -------------------------------------------------------
ActiveRecord::Base.connection.exec_query(
    "INSERT INTO customers(user_id, created_at, updated_at, reward_points) VALUES
    ((SELECT id FROM users WHERE username = 'customer'), 'now', 'now', 50);"
)

ActiveRecord::Base.connection.exec_query(
    "INSERT INTO customers(user_id, created_at, updated_at, reward_points) VALUES
    ((SELECT id FROM users WHERE username = 'JohnDoe'), 'now', 'now', 50);"
)

test_customer_1 = ActiveRecord::Base.connection.exec_query(
    "SELECT *
    FROM customers
    WHERE user_id = (SELECT id FROM users WHERE username = 'customer');"
).to_a[0]

test_customer_2 = ActiveRecord::Base.connection.exec_query(
    "SELECT *
    FROM customers
    WHERE user_id = (SELECT id FROM users WHERE username = 'JohnDoe');"
).to_a[0]

# ------------------------------------------------ Full Time Riders ---------------------------------------------------
MONTHLY_BASE_SALARY = 1200
# Test rider 1
ActiveRecord::Base.connection.begin_db_transaction
ActiveRecord::Base.connection.exec_query(
    "INSERT INTO riders(user_id, r_type, created_at, updated_at) VALUES
    ((SELECT id FROM users WHERE username = 'rider'), 'full_time', 'now', 'now');"
)

test_rider_1 = ActiveRecord::Base.connection.exec_query(
    "SELECT * FROM riders WHERE user_id = (SELECT id FROM users WHERE username = 'rider');"
).to_a[0]

ActiveRecord::Base.connection.exec_query(
    "INSERT INTO full_time_riders(id, monthly_base_salary)
    VALUES (#{test_rider_1["user_id"]}, #{MONTHLY_BASE_SALARY});"
)

ActiveRecord::Base.connection.exec_query(
    "INSERT INTO rider_salaries(rider_id, start_date, end_date, base_salary)
    VALUES (#{test_rider_1["user_id"]}, '2020-03-01', '2020-03-31', #{MONTHLY_BASE_SALARY});"
)

ActiveRecord::Base.connection.exec_query(
    "INSERT INTO rider_salaries(rider_id, start_date, end_date, base_salary)
    VALUES (#{test_rider_1["user_id"]}, date_trunc('month', CURRENT_DATE),
        date_trunc('month', CURRENT_DATE) + interval '1 month - 1 day', #{MONTHLY_BASE_SALARY});"
)
ActiveRecord::Base.connection.commit_db_transaction

# ------------------------------------------------ Part Time Riders ---------------------------------------------------
WEEKLY_BASE_SALARY = 200
# Test rider 2 (part time)
ActiveRecord::Base.connection.begin_db_transaction
ActiveRecord::Base.connection.exec_query(
    "INSERT INTO riders(user_id, r_type, created_at, updated_at) VALUES
    ((SELECT id FROM users WHERE username = 'rider2'), 'part_time', 'now', 'now');"
)

test_pt_rider_1 = ActiveRecord::Base.connection.exec_query(
    "SELECT * FROM riders WHERE user_id = (SELECT id FROM users WHERE username = 'rider2');"
).to_a[0]

ActiveRecord::Base.connection.exec_query(
    "INSERT INTO part_time_riders(id, weekly_base_salary)
    VALUES (#{test_pt_rider_1["user_id"]}, #{WEEKLY_BASE_SALARY});"
)

ActiveRecord::Base.connection.exec_query(
    "INSERT INTO rider_salaries(rider_id, start_date, end_date, base_salary)
    VALUES (#{test_pt_rider_1["user_id"]}, date_trunc('week', CURRENT_DATE),
        date_trunc('week', CURRENT_DATE) + interval '1 week - 1 day', #{WEEKLY_BASE_SALARY});"
)
ActiveRecord::Base.connection.commit_db_transaction

# ------------------------------------------------- Managers ----------------------------------------------------------
ActiveRecord::Base.connection.exec_query(
    "INSERT INTO managers(user_id, created_at, updated_at) VALUES
    ((SELECT id FROM users WHERE username = 'manager'), 'now', 'now'),
    ((SELECT id FROM users WHERE username = 'manager2'), 'now', 'now');"
)

# -------------------------------------------------- Admin ------------------------------------------------------------
ActiveRecord::Base.connection.exec_query(
    "INSERT INTO admins(user_id, created_at, updated_at) VALUES
    ((SELECT id FROM users WHERE username = 'admin'), 'now', 'now');"
)


# ------------------------------------------------ Restaurants -------------------------------------------------------
test_manager_1 = ActiveRecord::Base.connection.exec_query(
    "SELECT *
    FROM managers
    WHERE user_id = (SELECT id FROM users WHERE username ='manager');"
).to_a[0]

test_manager_2 = ActiveRecord::Base.connection.exec_query(
    "SELECT *
    FROM managers
    WHERE user_id = (SELECT id FROM users WHERE username ='manager2');"
).to_a[0]

ActiveRecord::Base.connection.exec_query(
    "INSERT INTO restaurants(name, min_order_cost, address, manager_id)
    VALUES (\'ameens\', 5.5, \'12 Clementi Rd, Singapore 129742\', #{test_manager_1["id"]});"
)

ActiveRecord::Base.connection.exec_query(
    "INSERT INTO restaurants(name, min_order_cost, address, manager_id)
    VALUES (\'Bannered Mare\', 5, \'Whiterun\', #{test_manager_2["id"]});"
)

test_restaurant_1 = ActiveRecord::Base.connection.exec_query(
    "SELECT * FROM restaurants
     WHERE manager_id = #{test_manager_1["id"]};"
).to_a[0]

# ------------------------------------------------ Menu Sections -----------------------------------------------------
ActiveRecord::Base.connection.exec_query(
    "INSERT INTO menu_sections(ms_name, restaurant_id)
    VALUES ('Main', #{test_restaurant_1["id"]});"
)

test_menu_section_1 = ActiveRecord::Base.connection.exec_query(
    "SELECT * FROM menu_sections
    WHERE ms_name = 'Main'
    AND restaurant_id = #{test_restaurant_1["id"]}"
).to_a[0]

ActiveRecord::Base.connection.exec_query(
    "INSERT INTO menu_sections(ms_name, restaurant_id)
    VALUES ('Side dish', #{test_restaurant_1["id"]});"
)

test_menu_section_2 = ActiveRecord::Base.connection.exec_query(
    "SELECT * FROM menu_sections
    WHERE ms_name = 'Side dish'
    AND restaurant_id = #{test_restaurant_1["id"]}"
).to_a[0]

ActiveRecord::Base.connection.exec_query(
    "INSERT INTO menu_sections(ms_name, restaurant_id)
    VALUES ('Drinks', #{test_restaurant_1["id"]});"
)

test_menu_section_3 = ActiveRecord::Base.connection.exec_query(
    "SELECT * FROM menu_sections
    WHERE ms_name = 'Drinks'
    AND restaurant_id = #{test_restaurant_1["id"]}"
).to_a[0]

# --------------------------------------------------- Foods ---------------------------------------------------------
ActiveRecord::Base.connection.exec_query(
    "INSERT INTO foods(f_name, daily_limit, price, restaurant_id, ms_url_id)
    VALUES ('nasi pataya', 500, 4.5, #{test_restaurant_1["id"]}, #{test_menu_section_1["url_id"]})"
)

test_food_1 = ActiveRecord::Base.connection.exec_query(
    "SELECT * FROM foods
    WHERE f_name = 'nasi pataya'
    AND restaurant_id = #{test_restaurant_1["id"]}"
).to_a[0]

ActiveRecord::Base.connection.exec_query(
    "INSERT INTO foods(f_name, daily_limit, price, restaurant_id, ms_url_id)
    VALUES ('maggi goreng', 130, 3.2, #{test_restaurant_1["id"]}, #{test_menu_section_1["url_id"]})"
)

test_food_2 = ActiveRecord::Base.connection.exec_query(
    "SELECT * FROM foods
    WHERE f_name = 'maggi goreng'
    AND restaurant_id = #{test_restaurant_1["id"]}"
).to_a[0]

ActiveRecord::Base.connection.exec_query(
    "INSERT INTO foods(f_name, daily_limit, price, restaurant_id, ms_url_id)
    VALUES ('roti prata', 110, 1.2, #{test_restaurant_1["id"]}, #{test_menu_section_2["url_id"]})"
)

test_food_3 = ActiveRecord::Base.connection.exec_query(
    "SELECT * FROM foods
    WHERE f_name = 'roti prata'
    AND restaurant_id = #{test_restaurant_1["id"]}"
).to_a[0]

ActiveRecord::Base.connection.exec_query(
    "INSERT INTO foods(f_name, daily_limit, price, restaurant_id, ms_url_id)
    VALUES ('cheese fries', 200, 3, #{test_restaurant_1["id"]}, #{test_menu_section_2["url_id"]})"
)

test_food_4 = ActiveRecord::Base.connection.exec_query(
    "SELECT * FROM foods
    WHERE f_name = 'cheese fries'
    AND restaurant_id = #{test_restaurant_1["id"]}"
).to_a[0]

ActiveRecord::Base.connection.exec_query(
    "INSERT INTO foods(f_name, daily_limit, price, restaurant_id, ms_url_id)
    VALUES ('milo dinosaur', 250, 2.10, #{test_restaurant_1["id"]}, #{test_menu_section_3["url_id"]})"
)

test_food_5 = ActiveRecord::Base.connection.exec_query(
    "SELECT * FROM foods
    WHERE f_name = 'milo dinosaur'
    AND restaurant_id = #{test_restaurant_1["id"]}"
).to_a[0]

# --------------------------------------------- FDS Promotions -------------------------------------------------------
ActiveRecord::Base.connection.begin_db_transaction
ActiveRecord::Base.connection.exec_query(
    "INSERT INTO Promotions(p_name, p_type, promocode, max_redeem, start_datetime, end_datetime, percentage)
    VALUES ('fds test', 'fds', 'FDS20', 3, 'now', '2020/12/30'::timestamp, 20);"
)

test_promo_1 = ActiveRecord::Base.connection.exec_query(
    "SELECT * FROM Promotions
    WHERE promocode = 'FDS20'"
).to_a[0]

ActiveRecord::Base.connection.exec_query(
    "INSERT INTO fds_promotions(promotion_id, p_type)
    VALUES (#{test_promo_1['id']}, '#{test_promo_1['p_type']}');"
)
ActiveRecord::Base.connection.commit_db_transaction

# ------------------------------------------ Restaurant Promotions ---------------------------------------------------
# Promo 2
ActiveRecord::Base.connection.begin_db_transaction
ActiveRecord::Base.connection.exec_query(
    "INSERT INTO Promotions(p_name, p_type, promocode, max_redeem, start_datetime, end_datetime, percentage)
    VALUES ('Ameens Sales 2020', 'restaurant', 'RES10', 20, 'now', '2020/12/30'::timestamp, 5);"
)

test_promo_2 = ActiveRecord::Base.connection.exec_query(
    "SELECT * FROM Promotions
    WHERE promocode = 'RES10'"
).to_a[0]

ActiveRecord::Base.connection.exec_query(
    "INSERT INTO restaurant_promotions(promotion_id, p_type)
    VALUES (#{test_promo_2['id']}, '#{test_promo_2['p_type']}');"
)

ActiveRecord::Base.connection.exec_query(
    "INSERT INTO has_promotions(restaurant_id, restaurant_promotion_id)
    VALUES (#{test_restaurant_1['id']}, #{test_promo_2['id']});"
)
ActiveRecord::Base.connection.commit_db_transaction

# Promo 3
ActiveRecord::Base.connection.begin_db_transaction
ActiveRecord::Base.connection.exec_query(
    "INSERT INTO Promotions(p_name, p_type, promocode, max_redeem, start_datetime, end_datetime, percentage)
    VALUES ('Ameens Deepavali 2020', 'restaurant', 'DP20', 50, '2020/11/14 00:00', '2020/11/15 00:00', 25);"
)

test_promo_3 = ActiveRecord::Base.connection.exec_query(
    "SELECT * FROM Promotions
    WHERE promocode = 'DP20'"
).to_a[0]

ActiveRecord::Base.connection.exec_query(
    "INSERT INTO restaurant_promotions(promotion_id, p_type)
    VALUES (#{test_promo_3['id']}, '#{test_promo_3['p_type']}');"
)

ActiveRecord::Base.connection.exec_query(
    "INSERT INTO has_promotions(restaurant_id, restaurant_promotion_id)
    VALUES (#{test_restaurant_1['id']}, #{test_promo_3['id']});"
)
ActiveRecord::Base.connection.commit_db_transaction

# Promo 4
ActiveRecord::Base.connection.begin_db_transaction
ActiveRecord::Base.connection.exec_query(
    "INSERT INTO Promotions(p_name, p_type, promocode, max_redeem, start_datetime, end_datetime, percentage)
    VALUES ('Ameens Chinese New Year 2020', 'restaurant', 'CNY20', 88, '2020/2/12 00:00', '2020/2/15 00:00', 20);"
)

test_promo_4 = ActiveRecord::Base.connection.exec_query(
    "SELECT * FROM Promotions
    WHERE promocode = 'CNY20'"
).to_a[0]

ActiveRecord::Base.connection.exec_query(
    "INSERT INTO restaurant_promotions(promotion_id, p_type)
    VALUES (#{test_promo_4['id']}, '#{test_promo_4['p_type']}');"
)

ActiveRecord::Base.connection.exec_query(
    "INSERT INTO has_promotions(restaurant_id, restaurant_promotion_id)
    VALUES (#{test_restaurant_1['id']}, #{test_promo_4['id']});"
)
ActiveRecord::Base.connection.commit_db_transaction

# ------------------------------------------- Closed Orders/Reviews ---------------------------------------------------
DELIVERY_FEE = 3

# Order 1
ActiveRecord::Base.connection.begin_db_transaction
# Total price: (9.4 + 3 - 3) * 0.8 = $ 7.52
ActiveRecord::Base.connection.exec_query(
    "INSERT INTO Orders(customer_id, promo_id, restaurant_id, point_offset,
                        payment_method, delivery_fee, total_price, date_time, status)
    VALUES (1, 1, 1, 3, 'cash', 3, 7.52, CURRENT_TIMESTAMP, 'complete');"
)

test_order_1 = ActiveRecord::Base.connection.exec_query(
    "SELECT oid FROM Orders
    LIMIT 1"
).to_a[0]

ActiveRecord::Base.connection.exec_query(
    "INSERT INTO Delivers(oid, rider_id, customer_location, order_time,
                          depart_to_restaurant_time, arrive_at_restaurant_time,
                          depart_to_customer_time, order_delivered_time)
    VALUES (#{test_order_1['oid']}, (SELECT id FROM users WHERE username = 'rider'), 'Somewhere in Singapore ¯\\_(ツ)_/¯',
            CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '5 min',
            CURRENT_TIMESTAMP + INTERVAL '10 min', CURRENT_TIMESTAMP + INTERVAL '15 min',
            CURRENT_TIMESTAMP + INTERVAL '1 hour');"
)

ActiveRecord::Base.connection.exec_query(
    "INSERT INTO Comprises(oid, food_id, quantity)
    VALUES (#{test_order_1['oid']}, #{test_food_2['id']}, 2);"
)

ActiveRecord::Base.connection.exec_query(
    "INSERT INTO Comprises(oid, food_id, quantity)
    VALUES (#{test_order_1['oid']}, #{test_food_4['id']}, 1);"
)

ActiveRecord::Base.connection.exec_query(
    "INSERT INTO Reviews(oid, rider_id, rider_rating, food_review)
    VALUES (#{test_order_1['oid']}, (SELECT id FROM users WHERE username = 'rider'), 4,
            'Delicious! But where''s the L A M B S A U C E');"
)
ActiveRecord::Base.connection.commit_db_transaction

# ---------------------------------------------- In progress Orders ---------------------------------------------------
# Order 1
ActiveRecord::Base.connection.begin_db_transaction
ActiveRecord::Base.connection.exec_query(
    "INSERT INTO Orders(customer_id, promo_id, restaurant_id, point_offset,
                        payment_method, delivery_fee, total_price, date_time, status)
    VALUES (#{test_customer_1["user_id"]}, null, #{test_restaurant_1["id"]}, 0, 'cash', #{DELIVERY_FEE}, 
        9, 'now', 'in progress');"
)

in_progress_order_1 = ActiveRecord::Base.connection.exec_query(
    "SELECT * FROM Orders
    WHERE status = 'in progress'
    AND customer_id = #{test_customer_1["user_id"]}
    LIMIT 1"
).to_a[0]

ActiveRecord::Base.connection.exec_query(
    "INSERT INTO Delivers(oid, rider_id, customer_location, order_time)
    VALUES (#{in_progress_order_1['oid']}, #{test_pt_rider_1["user_id"]}, 'Bikini Bottom',
            CURRENT_TIMESTAMP)"
)

ActiveRecord::Base.connection.exec_query(
    "INSERT INTO Comprises(oid, food_id, quantity)
    VALUES (#{in_progress_order_1['oid']}, #{test_food_3['id']}, 5);"
)
ActiveRecord::Base.connection.commit_db_transaction

# Order 2
ActiveRecord::Base.connection.begin_db_transaction
# Total price = 24.5 * 0.95 = $ 23.28 
ActiveRecord::Base.connection.exec_query(
    "INSERT INTO Orders(customer_id, promo_id, restaurant_id, point_offset,
                        payment_method, delivery_fee, total_price, date_time, status)
    VALUES (#{test_customer_2["user_id"]}, #{test_promo_2["id"]}, #{test_restaurant_1["id"]}, 0, 'cash', #{DELIVERY_FEE}, 
        23.28, 'now', 'in progress');"
)

in_progress_order_2 = ActiveRecord::Base.connection.exec_query(
    "SELECT * FROM Orders
    WHERE status = 'in progress'
    AND customer_id = #{test_customer_2["user_id"]}
    AND promo_id = #{test_promo_2["id"]}
    LIMIT 1"
).to_a[0]

ActiveRecord::Base.connection.exec_query(
    "INSERT INTO Delivers(oid, rider_id, customer_location, order_time)
    VALUES (#{in_progress_order_2['oid']}, (SELECT id FROM users WHERE username = 'rider'), 'Bikini Bottom',
            'now')"
)

ActiveRecord::Base.connection.exec_query(
    "INSERT INTO Comprises(oid, food_id, quantity)
    VALUES (#{in_progress_order_2['oid']}, #{test_food_1['id']}, 2);"
)

ActiveRecord::Base.connection.exec_query(
    "INSERT INTO Comprises(oid, food_id, quantity)
    VALUES (#{in_progress_order_2['oid']}, #{test_food_2['id']}, 1);"
)

ActiveRecord::Base.connection.exec_query(
    "INSERT INTO Comprises(oid, food_id, quantity)
    VALUES (#{in_progress_order_2['oid']}, #{test_food_4['id']}, 1);"
)

ActiveRecord::Base.connection.exec_query(
    "INSERT INTO Comprises(oid, food_id, quantity)
    VALUES (#{in_progress_order_2['oid']}, #{test_food_5['id']}, 3);"
)
ActiveRecord::Base.connection.commit_db_transaction

# ---------------------------------------------- Monthly Work Schedules -----------------------------------------------
# Rider 1
ActiveRecord::Base.connection.exec_query(
    "INSERT INTO monthly_work_schedules(rider_id)
    VALUES(#{test_rider_1["user_id"]});"
)

ActiveRecord::Base.connection.begin_db_transaction
test_mws_1 = ActiveRecord::Base.connection.exec_query(
    "SELECT * FROM monthly_work_schedules 
    WHERE rider_id = #{test_rider_1["user_id"]}"
).to_a[0]

ActiveRecord::Base.connection.exec_query(
    "INSERT INTO weekly_work_schedules(w_type, mws_id)
    VALUES('monthly_work_schedule', #{test_mws_1["mws_id"]});"
)

test_wws_1 = ActiveRecord::Base.connection.exec_query(
    "SELECT * FROM WEEKLY_work_schedules 
    WHERE w_type = 'monthly_work_schedule'
    AND mws_id = #{test_mws_1["mws_id"]};"
).to_a[0]

for i in 0..4 do
    day = (Date.parse('2020-03-30') + i.days).strftime('%A')
    start_hour_1 = (Time.parse('10:00') + (i % 4).hours).strftime('%R') 
    end_hour_1 = (Time.parse('14:00') + (i % 4).hours).strftime('%R')
    start_hour_2 = (Time.parse('15:00') + (i % 4).hours).strftime('%R') 
    end_hour_2 = (Time.parse('19:00') + (i % 4).hours).strftime('%R')
    
    ActiveRecord::Base.connection.exec_query(
        "INSERT INTO working_intervals(workingDay, startHour, endHour, wws_id)
        VALUES('#{day}', '#{start_hour_1}', '#{end_hour_1}', #{test_wws_1["wws_id"]})"
    )

    ActiveRecord::Base.connection.exec_query(
        "INSERT INTO working_intervals(workingDay, startHour, endHour, wws_id)
        VALUES('#{day}', '#{start_hour_2}', '#{end_hour_2}', #{test_wws_1["wws_id"]})"
    )
end
ActiveRecord::Base.connection.commit_db_transaction

# ---------------------------------------------- Weekly Work Schedules -----------------------------------------------
# For part time rider 1
ActiveRecord::Base.connection.begin_db_transaction
ActiveRecord::Base.connection.exec_query(
    "INSERT INTO weekly_work_schedules(w_type, pt_rider_id)
    VALUES('part_time_rider', #{test_pt_rider_1["user_id"]})"
)

test_wws_pt_1 = ActiveRecord::Base.connection.exec_query(
    "SELECT * FROM weekly_work_schedules 
    WHERE pt_rider_id = #{test_pt_rider_1["user_id"]}"
).to_a[0]

# Mon 1100 - 1500; Wed 1300 - 1700; Fri 1100 - 1500
for i in 0..2 do
    day = (Date.parse('2020-04-06') + (i * 2).days).strftime('%A')
    start_hour = (Time.parse('11:00') + ((i % 2) * 2).hours).strftime('%R') 
    end_hour = (Time.parse('15:00') + ((i % 2) * 2).hours).strftime('%R')        
    
    ActiveRecord::Base.connection.exec_query(
        "INSERT INTO working_intervals(workingDay, startHour, endHour, wws_id)
        VALUES('#{day}', '#{start_hour}', '#{end_hour}', #{test_wws_pt_1["wws_id"]})"
    )
end
ActiveRecord::Base.connection.commit_db_transaction

# --------------------------------------------------- Attendance ------------------------------------------------------
# Rider 1
for i in 0..4 do
    date = (Date.parse('2020-03-30') + i.days).strftime('%F')
    clock_in = (Time.parse('10:00') + (i % 4).hours).strftime('%R')
    clock_out = (Time.parse('19:00') + (i % 4).hours).strftime('%R')
    
    ActiveRecord::Base.connection.exec_query(
        "INSERT INTO Attendance(id, w_date, clock_in, clock_out, total_hours)
        VALUES(#{test_rider_1["user_id"]}, '#{date}', '#{clock_in}', '#{clock_out}', 8)"
    )    
end

# Part time rider 1
for i in 0..2 do
    date = (Date.parse('2020-04-06') + (i * 2).days).strftime('%F')
    clock_in = (Time.parse('11:00') + ((i % 2) * 2).hours).strftime('%R') 
    clock_out = (Time.parse('15:00') + ((i % 2) * 2).hours).strftime('%R')        
    
    ActiveRecord::Base.connection.exec_query(
        "INSERT INTO Attendance(id, w_date, clock_in, clock_out, total_hours)
        VALUES(#{test_pt_rider_1["user_id"]}, '#{date}', '#{clock_in}', '#{clock_out}', 4)"
    )
end
