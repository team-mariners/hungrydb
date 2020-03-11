class Restaurant < ApplicationRecord
    belongs_to :manager 
    has_many :foods, validate: true, dependent: :destroy
    has_many :food_categories, validate: true, dependent: :destroy
    validates :minOrderCost, numericality: { greater_than_or_equal_to: 0 }
end