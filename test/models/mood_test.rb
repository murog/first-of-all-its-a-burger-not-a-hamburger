require "test_helper"

describe Mood do
  let(:mood) { Mood.new }

  it "must be invalid without name" do
    mood.valid?.must_equal false
    mood.name = "the new mood"
    mood.valid?.must_equal true
  end

  it "must be invalid if description is greater than 140 characters" do
    moods(:mood_too_long).valid?.must_equal false
  end

  it "will be valid if description is blank" do
    mood.valid?.must_equal false
    mood.name = "the new mood"
    mood.valid?.must_equal true
    mood.description = ""
    mood.valid?.must_equal true
  end

  it "will be valid if description under 140 characters" do
    mood.valid?.must_equal false
    mood.name = "the new mood"
    mood.valid?.must_equal true
    mood.description = "140 characters is good"
    mood.valid?.must_equal true
  end

  it "will be valid with 140 character description" do
    mood.valid?.must_equal false
    mood.name = "the new mood"
    mood.valid?.must_equal true
    mood.description = "one hundred and forty one hundred and forty one hundred and forty one hundred and forty one hundred and forty one hundred and forty one one!"
    mood.valid?.must_equal true
  end
end
