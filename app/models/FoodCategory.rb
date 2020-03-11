class FoodCategory < ApplicationRecord
    belongs_to :restaurant
    has_many :foods
    validates :name, length: { maximum: 100 }
end