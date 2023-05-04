class Playlist < ApplicationRecord
    validates :title, presence: true

    has_many :playlist_songs, dependent: :destroy
    has_many :songs, through: :playlist_songs

    has_one_attached :image
end
