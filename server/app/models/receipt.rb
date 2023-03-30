class Receipt < ApplicationRecord
    has_many    :reservation_rooms
    has_many    :rooms, :through => :reservation_rooms
    has_many    :reservation_sports
    has_many    :sports, :through => :reservation_sports
    has_many    :reservation_spas
    has_many    :spas, :through => :reservation_spas
    belongs_to  :user
end
