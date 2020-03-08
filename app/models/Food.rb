class Food < ApplicationRecord
    belongs_to :restaurant
    belongs_to :food_category
    validates :name, length: { maximum: 100 }
    validates :dailyLimit, :numOrders, :price, numericality: { greater_than_or_equal_to: 0 }
end