class ReservationSpa < ApplicationRecord
    belongs_to :spa
    belongs_to :receipt
end
