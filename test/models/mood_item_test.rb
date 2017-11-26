require "test_helper"

describe MoodItem do
  let(:mood_item) { MoodItem.new }

  it "must be invalid without everything" do
    mood_item.valid?.must_equal false
    mood_item.mood_id = moods(:first_valid_mood).id
    mood_item.valid?.must_equal false
    mood_item.item_id = items(:first_burger)
    mood_item.valid?.must_equal false
    mood_item.top_coord = 40
    mood_item.valid?.must_equal false
    mood_item.left_coord = 40
    mood_item.valid?.must_equal false
    mood_item.z_index = 1
    mood_item.valid?.must_equal true
  end
end
