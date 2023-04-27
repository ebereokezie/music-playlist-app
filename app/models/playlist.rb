class Playlist < ApplicationRecord
    validates :title, presence: true, uniqueness: true

    has_many :playlist_songs, dependent: :destroy
    has_many :songs, through: :playlist_songs

end
