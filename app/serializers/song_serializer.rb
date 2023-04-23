class SongSerializer < ActiveModel::Serializer
  attributes :id, :title, :artist, :album

  has_many :playlist_songs
  has_many :playlists, through: :playlist_songs
end
