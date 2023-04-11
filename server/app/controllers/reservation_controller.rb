class ReservationController < ApplicationController
    def available
        av=[]
        ids=Room.select("id")
        
        for id in ids
            reservations=ReservationRoom.where("room_id=?",id)
            flag_av=true
            if reservations.length() > 0
               for reservation in reservations
                    if reservation.starting_date_reservation <= DateTime.parse(params["check_out_date"])  and reservation.ending_date_reservation>= DateTime.parse(params["check_in_date"])
                        flag_av=false
                    end
               end
               if flag_av==true
                av.append(id.id)
               end
            else
                av.append(id.id)
            end
        end
        
        available_rooms=Room.joins(:hotel).select("rooms.*, hotels.name_hotel").where("rooms.id IN (?)",av)
        render json: available_rooms.to_json
    end
    def sport

        hotel_sports=Sport.joins(:hotel).select("sports.*,hotels.name_hotel").where("hotels.id=?",params["hotel_id"])
        av_s=[]
        for sp in hotel_sports
            if sp.starting_date_sport <= DateTime.parse(params["check_out_date"])  and sp.ending_date_sport>= DateTime.parse(params["check_in_date"])
                av_s.append(sp)
            end
        end
        render json: av_s.to_json
    end
end