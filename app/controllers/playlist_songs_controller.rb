class PlaylistSongsController < ApplicationController

    def index
        playlist = Playlist.find_by_id(params[:id])

        playlist_songs = playlist.playlist_songs

        render json: playlist_songs

    end

    def create
        playlist = Playlist.find_by_id(params[:id])

        playlist_song = playlist.playlist_song.create(playlist_song_params)

        if playlist_song.valid?
           render json: playlist_song, status: :created

        else
            render json: {errors: playlist_song.errors.full_messages}, status: :unprocessable_entity
        end

    end

    def destroy
        playlist = Playlist.find_by_id(params[:id])
        playlist_song = playlist.playlist_song.find_by_id(params[:id])

        if playlist_song
            playlist_song.destroy
            head :no_content
        else
            render json: {error: "Playlist Song not found"}, status: :not_found
        end

    end


    private

    def playlist_song_params
        params.permit(:song_id)
    end


end
