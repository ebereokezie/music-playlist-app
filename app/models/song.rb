class Song < ApplicationRecord
  validates: title, presence: true
  validates: artist, presence: true
  validates: album, presence: true

  has_many: playlist_songs
  has_many :playlists, through: :playlist_songs
end
