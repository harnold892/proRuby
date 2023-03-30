class AuthController < ApplicationController
    def login
        user=User.find_by(username: params['username']).try(:authenticate, params['password'])

        if user
            render json: {
                user: user
            }
        else
            render json: { error: invalid }, status: :unprocessable_entity
        end
    end
end