class Item < ApplicationRecord
  has_many :mood_items
  validates :name, presence: true, uniqueness: true
  validates :url, presence: true, uniqueness: true
  validates :alt_text, presence: true
end
