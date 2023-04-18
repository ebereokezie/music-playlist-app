class PlaylistSerializer < ActiveModel::Serializer
  attributes :id, :title

  has_many: playlist_songs
  has_many :songs, through: :playlist_songs
end
