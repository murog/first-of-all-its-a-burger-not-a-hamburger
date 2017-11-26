class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  def index
    @mood = Mood.new
    generate_items(4)


  end
  private
  def generate_items(num)
    all_items = Item.all
    all_items.shuffle
    @items = []
    num.times do |i|
      return if all_items[i].nil?
      @items << all_items[i]
    end
  end
end
