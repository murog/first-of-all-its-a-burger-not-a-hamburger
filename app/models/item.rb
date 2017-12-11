class Item < ApplicationRecord
  has_many :mood_items
  validates :name, presence: true, uniqueness: true
  validates :url, presence: true, uniqueness: true
  validates :alt_text, presence: true

  def self.generate_items(num)
    all_items = Item.all.shuffle
    items = []
    num.times do |i|
      return if all_items[i].nil?
      items << all_items[i]
    end
    return items
  end
end
