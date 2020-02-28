class Food < ApplicationRecord
    belongs_to :restaurant
    validates :name, length: { maximum: 100 }
    validates :maxLimit, :numOrders, :price, numericality: { greater_than_or_equal_to: 0 }
end