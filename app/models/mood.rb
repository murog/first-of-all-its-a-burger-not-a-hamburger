class Mood < ApplicationRecord
  has_many :mood_items
  has_many :items, through: :mood_items
  validates :name, presence: true
  validates :description, length: 0..140, allow_blank: true
  belongs_to :user, optional: true
  belongs_to :prompt, optional: true

end
