# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Create test users with multiple roles
ActiveRecord::Base.connection.exec_query(
    "INSERT INTO users(username, encrypted_password, email, roles, created_at, updated_at) VALUES
    ('customer', '#{Devise::Encryptor.digest(User, "12345678")}', 'customer@example.com', 'customer', 'now', 'now'),
    ('rider', '#{Devise::Encryptor.digest(User, "12345678")}', 'rider@example.com', 'rider', 'now', 'now'),
    ('manager', '#{Devise::Encryptor.digest(User, "12345678")}', 'manager@example.com', 'manager', 'now', 'now'),
    ('manager2', '#{Devise::Encryptor.digest(User, "12345678")}', 'manager2@example.com', 'manager', 'now', 'now'),
    ('admin', '#{Devise::Encryptor.digest(User, "12345678")}', 'admin@example.com', 'admin', 'now', 'now');"
)

# Users with customer role
ActiveRecord::Base.connection.exec_query(
    "INSERT INTO customers(user_id, created_at, updated_at) VALUES
    ((SELECT id FROM users WHERE username = 'customer'), 'now', 'now');"
)

# Users with rider role
ActiveRecord::Base.connection.exec_query(
    "INSERT INTO riders(user_id, created_at, updated_at) VALUES
    ((SELECT id FROM users WHERE username = 'rider'), 'now', 'now');"
)

# Users with manager role
ActiveRecord::Base.connection.exec_query(
    "INSERT INTO managers(user_id, created_at, updated_at) VALUES
    ((SELECT id FROM users WHERE username = 'manager'), 'now', 'now'),
    ((SELECT id FROM users WHERE username = 'manager2'), 'now', 'now');"
)

# Users with admin role
ActiveRecord::Base.connection.exec_query(
    "INSERT INTO admins(user_id, created_at, updated_at) VALUES
    ((SELECT id FROM users WHERE username = 'admin'), 'now', 'now');"
)

# ------------------------------------------------ Restaurants -------------------------------------------------------
test_manager_1 = Manager.find(1)
test_manager_2 = Manager.find(2)

ActiveRecord::Base.connection.exec_query(
    "INSERT INTO restaurants(name, min_order_cost, address, manager_id)
    VALUES (\'ameens\', 5.5, \'12 Clementi Rd, Singapore 129742\', #{test_manager_1.id});"
)

ActiveRecord::Base.connection.exec_query(
    "INSERT INTO restaurants(name, min_order_cost, address, manager_id)
    VALUES (\'Bannered Mare\', 5, \'Whiterun\', #{test_manager_2.id});"
)

test_restaurant_1 = ActiveRecord::Base.connection.exec_query(
    "SELECT * FROM restaurants
     WHERE manager_id = #{test_manager_1.id};"
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
    VALUES ('Ameens Sales 2020', 'restaurant', 'RES10', 1, 'now', '2020/12/30'::timestamp, 10);"
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

# ------------------------------------------- Orders/Reviews ---------------------------------------------------------
ActiveRecord::Base.connection.begin_db_transaction

ActiveRecord::Base.connection.exec_query(
    "INSERT INTO Orders(customer_id, promo_id, restaurant_id, point_offset,
                        payment_method, delivery_fee, date_time, status)
    VALUES (1, 1, 1, 3, 'cash', 2.5, '2020-03-10T11:45:08.000Z'::timestamp, 'complete');"
)

test_order_1 = ActiveRecord::Base.connection.exec_query(
    "SELECT oid FROM Orders
    WHERE status = 'complete'
    LIMIT 1"
).to_a[0]

ActiveRecord::Base.connection.exec_query(
    "INSERT INTO Delivers(oid, rider_id, customer_location, order_time,
                          depart_to_restaurant_time, arrive_at_restaurant_time,
                          depart_to_customer_time, arrive_at_customer_time)
    VALUES (#{test_order_1['oid']}, (SELECT id FROM users WHERE username = 'rider'), 'Somewhere in Singapore ¯\_(ツ)_/¯',
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
