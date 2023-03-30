class Sport < ApplicationRecord
    belongs_to :hotel
    has_many    :reservation_sports
    has_many    :receipts, :through => :reservation_sports
end
