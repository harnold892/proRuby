class SpaController < ApplicationController
    def user
        
    end
    def create
        spa = Spa.create!(
            name_spa: params['name_spa'],
            description_spa: params['description_spa'],
            price_spa: params['price_spa'],
            starting_date_spa: params['starting_date_spa'],
            hotel_id: params['hotel_spa'],
            ending_date_spa: params['ending_date_spa']
        )
    end
    def admin
        spas=Spa.joins(:hotel).select("spas.*, hotels.*")

        if spas
            render json: spas.to_json
        else
            render json: { status: 401}
        end
    end
end