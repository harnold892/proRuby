class StaticController < ApplicationController
    def home
        render json: { status: "radi"}
    end
end