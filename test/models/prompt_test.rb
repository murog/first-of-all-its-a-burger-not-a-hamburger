require "test_helper"

describe Prompt do
  let(:prompt) { Prompt.new }

  it "must be valid" do
    value(prompt).must_be :valid?
  end
end
