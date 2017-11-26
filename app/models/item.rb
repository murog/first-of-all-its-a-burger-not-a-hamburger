class Item < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :url, presence: true, uniqueness: true
  validates :alt_text, presence: true
end
