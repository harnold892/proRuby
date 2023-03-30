class RoomController < ApplicationController
    def create
        room = Room.create!(
            is_apartment: params['is_apartment'],
            capacity_room: params['capacity_room'],
            price_room: params['price_room'],
            number_room: params['number_room'],
            hotel_id: params['hotel_room']
        )
    end
    def admin
        
        rooms=Room.joins(:hotel).select("rooms.*, hotels.*")
        if rooms
            render json: rooms.to_json
        else
            render json: { status: 401}
        end
    end
end