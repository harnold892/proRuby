class Hotel < ApplicationRecord
    has_many :spas
    has_many :sports
    has_many :rooms
end
