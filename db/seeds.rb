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

Customer.create(
    user_id: testManager.id
)

Manager.create(
    user_id: testManager.id
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

testRestaurant = Manager.find_by(user_id: testManager.id).create_restaurant!(
    name: "ameens",
    minOrderCost: 5
)

testDish1 = testRestaurant.foods.create(
    name: "roti prata",
    dailyLimit: 110,
    numOrders: 0,
    price: 1.2
)

testDish2 = testRestaurant.foods.create(
    name: "nasi pataya",
    dailyLimit: 300,
    numOrders: 0,
    price: 5
)

testDish3 = testRestaurant.foods.create(
    name: "milo dinosaur",
    dailyLimit: 250,
    numOrders: 0,
    price: 2.1
)

testDish4 = testRestaurant.foods.create(
    name: "cheese fries",
    dailyLimit: 200,
    numOrders: 0,
    price: 3
)

testDish5 = testRestaurant.foods.create(
    name: "maggi goreng",
    dailyLimit: 130,
    numOrders: 0,
    price: 3.2
)