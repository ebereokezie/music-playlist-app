class PlaylistsController < ApplicationController

    def index
        user = User.find(session[:user_id])

        playlists = user.playlists

        render json: playlists

    end

    def show
        playlist = Playlist.find_by_id(params[:id])
        
        render json: playlist
      end

    def create
        user = User.find(session[:user_id])
        playlist = user.playlist.create(playlist_params)

        if playlist.valid?
            render json: playlist, status: :created
        else
            render json: {errors: playlist.errors.full_messages}, status: :unprocessable_entity
        end

    end

    def update
        playlist = Playlist.find_by_id(params[:id])
        if playlist
            if playlist.user_id == session[:user_id]
                if playlist.update(playlist_params)
                    render json: playlist
                else 
                    render json: {errors: playlist.errors.full_messages}, status: :unprocessable_entity
                end
            else 
                render json: {error: "Incorrect user"}, status: :unauthorized
            end
        else
          render json: {error: "Playlist not found"}, status: :not_found
        end
    end

    def destroy
        playlist = Playlist.find_by_id(params[:id])
        if playlist
            if playlist.user_id == session[:user_id]
                playlist.destroy
                head :no_content
            else
                render json: {errors: playlist.errors.full_messages}, status: :unprocessable_entity
             end
         else
            render json: {error: "Playlist not found"}, status: :not_found
         end
    end

    private

    def playlist_params
        params.permit(:title)
    end
end
