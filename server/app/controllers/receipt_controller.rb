class ReceiptController < ApplicationController
    def new
        receipt=Receipt.create!(
            total_price: params["total_sum"],
            date_purchase: params["date_receipt"],
            user_id: params["user_id"]
        )
    end
    def rooms
        id_receipt=Receipt.maximum(:id)
        for room in params["_json"]
            ReservationRoom.create!(
                starting_date_reservation: room["check_in_date"],
                ending_date_reservation: room["check_out_date"],
                room_id: room["id"],
                receipt_id: id_receipt
            )
        end
    end
    def sport
        id_receipt=Receipt.maximum(:id)
        for sp in params["_json"]
            ReservationSport.create!(
                sport_id: sp["id"],
                receipt_id: id_receipt
            )
        end
    end
    def spa
        id_receipt=Receipt.maximum(:id)
        for sp in params["_json"]
            ReservationSpa.create!(
                spa_id: sp["id"],
                receipt_id: id_receipt
            )
        end
    end
end