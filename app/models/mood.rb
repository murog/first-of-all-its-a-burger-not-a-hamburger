class Mood < ApplicationRecord
  validates :name, presence: true
  validates :description, length: 0..140, allow_blank: true


end
