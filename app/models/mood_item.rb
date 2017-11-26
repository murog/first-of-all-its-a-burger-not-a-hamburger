class MoodItem < ApplicationRecord
  validates :top_coord, presence: true
  validates :left_coord, presence: true
  validates :z_index, presence: true
  
end
