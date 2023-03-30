class SportController < ApplicationController
    def create
        sport = Sport.create!(
            name_sport: params['name_sport'],
            description_sport: params['description_sport'],
            price_sport: params['price_sport'],
            capacity_sport: params['capacity_sport'],
            starting_date_sport: params['starting_date_sport'],
            hotel_id: params['hotel_sport'],
            ending_date_sport: params['ending_date_sport']
        )
    end
    def admin
        sports=Sport.joins(:hotel).select("sports.*, hotels.*")

        if sports
            render json: sports.to_json
        else
            render json: { status: 401}
        end
    end
end