class Feedback < ApplicationRecord
  validates :name, :comments, presence: true
end
