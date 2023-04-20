class Playlist < ApplicationRecord
    validates :title, presence: true

    has_many :playlist_songs, dependent: :destroy
    has_many :songs, through: :playlist_songs

    # before_create :slugify
    # def slugify
    #     self.slug = title.parameterize
    # end
end
