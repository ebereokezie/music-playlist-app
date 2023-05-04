class PlaylistSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :title, :image_url

  has_many :playlist_songs
  has_many :songs, through: :playlist_songs

  def image_url
    if object.image.attached?
      rails_blob_url(object.image, only_path: true)
    end
  end
end
