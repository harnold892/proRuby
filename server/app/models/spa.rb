class Spa < ApplicationRecord
    belongs_to :hotel
    has_many    :reservation_spas
    has_many    :receipts, :through => :reservation_spas
end