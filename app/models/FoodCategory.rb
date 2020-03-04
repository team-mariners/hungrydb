class FoodCategory < ApplicationRecord
    belongs_to :restaurant
    has_many :foods
end