class Room < ApplicationRecord
    belongs_to  :hotel
    has_many    :reservation_rooms
    has_many    :receipts, :through => :reservation_rooms
end
