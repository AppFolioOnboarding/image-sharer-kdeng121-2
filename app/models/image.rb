class Image < ApplicationRecord
  validates :url, presence: true, format: URI.regexp(%w[http https])
  acts_as_taggable_on :tags
end
