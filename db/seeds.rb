# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Test customer
testCustomer = User.create(
    username: 'customer',
    password: '12345678',
    email: 'customer@example.com',
    roles: 'customer'
)

Customer.create(
    user_id: testCustomer.id
)

# Test rider
testRider = User.create(
    username: 'rider',
    password: '12345678',
    email: 'rider@example.com',
    roles: 'customer,rider'
)

Customer.create(
    user_id: testRider.id
)

Rider.create(
    user_id: testRider.id
)

# Test restaurant manager
testManager = User.create(
    username: 'manager',
    password: '12345678',
    email: 'manager@example.com',
    roles: 'customer,manager'
)

testManager2 = User.create(
    username: 'manager2',
    password: '12345678',
    email: 'manager2@example.com',
    roles: 'customer,manager'
)

Customer.create(
    user_id: testManager.id
)

Customer.create(
    user_id: testManager2.id
)

Manager.create(
    user_id: testManager.id
)

Manager.create(
    user_id: testManager2.id
)

# Test administrator
testAdmin = User.create(
    username: 'admin',
    password: '12345678',
    email: 'admin@example.com',
    roles: 'customer,admin'
)

Customer.create(
    user_id: testAdmin.id
)

Admin.create(
    user_id: testAdmin.id
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
