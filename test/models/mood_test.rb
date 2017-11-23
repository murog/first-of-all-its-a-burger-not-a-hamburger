require "test_helper"

describe Mood do
  let(:mood) { Mood.new }

  it "must be valid" do
    value(mood).must_be :valid?
  end
end
