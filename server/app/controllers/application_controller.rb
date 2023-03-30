class ApplicationController < ActionController::Base
    skip_before_action :verify_authenticity_token
    rescue_from ActiveRecord::RecordInvalid, with: :invalid

    private 

    def invalid(e)
        render json: { errors: e.record.errors.full_messages }, 
        status: :unprocessable_entity
    end
end
