class Restaurant < ApplicationRecord
    belongs_to :manager
    has_many :foods
end