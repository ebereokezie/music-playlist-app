class PlaylistSongSerializer < ActiveModel::Serializer
  attributes :id

  belongs_to :playlist
  belongs_to :song
end
