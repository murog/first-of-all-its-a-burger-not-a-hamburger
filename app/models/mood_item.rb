class MoodItem < ApplicationRecord
  belongs_to :mood
  belongs_to :item
  validates :top_coord, presence: true
  validates :left_coord, presence: true
  validates :z_index, presence: true

end
