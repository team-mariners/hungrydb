# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Test customer
User.create(
    username: 'customer',
    password: '12345678',
    email: 'customer@example.com',
    roles: 'customer'
)

# Test rider
User.create(
    username: 'rider',
    password: '12345678',
    email: 'rider@example.com',
    roles: 'customer,rider'
)

# Test restaurant manager
User.create(
    username: 'manager',
    password: '12345678',
    email: 'manager@example.com',
    roles: 'customer,manager'
)

# Test administrator
User.create(
    username: 'admin',
    password: '12345678',
    email: 'admin@example.com',
    roles: 'customer,admin'
)
