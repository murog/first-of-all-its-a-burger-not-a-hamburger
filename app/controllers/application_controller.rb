class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  protect_from_forgery with: :null_session

  def index
    @mood = Mood.new
    generate_items(5)


  end
  private
  def generate_items(num)
    all_items = Item.all.shuffle
    # all_items.shuffle!
    @items = []
    num.times do |i|
      return if all_items[i].nil?
      @items << all_items[i]
    end
  end
end
