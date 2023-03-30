class HotelController < ApplicationController
    def user
        
    end
    def create
        hotel = Hotel.create!(
            name_hotel: params['name_hotel'],
            address_hotel: params['address_hotel']
        )
    end
    def admin
        hotels=Hotel.all

        if hotels
            render json: hotels.to_json
        else
            render json: { status: 401}
        end
    end
end