class SessionsController < ApplicationController
    skip_before_action :authorized, only: :create
    def create
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            session[:user_id]= user.id
            render json: user, serializer: UserSerializer
        else
            render json: {errors: ["Invalid username or password"]}, status: :unauthorized
        end
    end

    def destroy
        user = User.find(session[:user_id])
        session.delete :user_id
        head :no_content
    end
end
