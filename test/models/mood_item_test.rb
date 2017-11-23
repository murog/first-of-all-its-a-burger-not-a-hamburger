require "test_helper"

describe MoodItem do
  let(:mood_item) { MoodItem.new }

  it "must be valid" do
    value(mood_item).must_be :valid?
  end
end
