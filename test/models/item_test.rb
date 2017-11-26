require "test_helper"

describe Item do
  let(:item) { Item.new }

  it "must be invalid without name, url and alt_text" do
    item.valid?.must_equal false
    item.name = "second_burger"
    item.valid?.must_equal false
    item.url = "second_burger.gif"
    item.valid?.must_equal false
    item.alt_text = "it's a second_burger"
    item.valid?.must_equal true
  end

  it "must be invalid if name and url are not unique" do
    item.valid?.must_equal false
    item.name = "first_burger"
    item.url = "first_burger.gif"
    item.alt_text = "it's a first_burger"
    item.valid?.must_equal false
    item.name = "unique_burger"
    item.url = "unique_burger.gif"
    item.valid?.must_equal true
  end

end
