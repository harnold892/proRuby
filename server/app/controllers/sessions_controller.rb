class SessionsController < ApplicationController
    def create
        user=User.find_by(username: params['username']).try(:authenticate, params['password'])

        if user
            session[:user_id] = user.id
            render json: {
                status: :created,
                user: user
            }
        else
            render json: { status: 401}
        end
    end
end