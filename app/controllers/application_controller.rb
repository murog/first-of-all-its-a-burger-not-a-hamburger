class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  protect_from_forgery with: :null_session
  before_action :find_user

  def index
    @mood = Mood.new
    generate_items(10)
    generate_prompt
    # generate_bday_prompt
    # generate_bday_items(4)
  end

  private

  def generate_prompt
    prompts = Prompt.where("id < ?", 33)
    @prompt = prompts.shuffle[0]
  end

  def generate_items(num)
    all_items = Item.where("url != ?", "birthday.png").shuffle
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

  def generate_bday_items(num)
    all_items = Item.all.shuffle
    @items = []
    num.times do |i|
      return if all_items[i].nil?
      @items << all_items[i]
    end
    @items << Item.find(73)
  end

  def generate_bday_prompt
    bday_prompts = Prompt.where("id > ?", 32)
    @prompt = bday_prompts.shuffle[0]
    if (!@prompt)
      temp_bday = Prompt.new
      temp_bday.text = "happy bday isaac, stay cool"
      temp_bday.save
      @prompt = temp_bday
    end
  end
end
