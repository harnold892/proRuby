class ReservationSport < ApplicationRecord
    belongs_to :room
    belongs_to :sport
end
