class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  protect_from_forgery with: :null_session
  before_action :find_user


  def index
    @mood = Mood.new
    generate_items(5)
    generate_prompt


  end
  private
  def generate_prompt
    prompts = Prompt.all
    @prompt = prompts.shuffle[0]
  end
  def generate_items(num)
    all_items = Item.all.shuffle
    # all_items.shuffle!
    @items = []
    num.times do |i|
      return if all_items[i].nil?
      @items << all_items[i]
    end
  end

  def render_404
    render file: "/public/404.html", status: 404
  end

  def find_user
    if session[:user_id]
      @user = User.find_by(id: session[:user_id])
    end
  end


end
