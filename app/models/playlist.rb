class Playlist < ApplicationRecord
    validates: title, presence: true

    has_many: playlist_songs
    has_many :songs, through: :playlist_songs

end
