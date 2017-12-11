class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  protect_from_forgery with: :null_session
  before_action :find_user

  def index
    @mood = Mood.new
    @items = Item.generate_items(5)
    @prompt = Prompt.generate_prompt
  end

  private

  def render_404
    render file: "/public/404.html", status: 404
  end

  def find_user
    if session[:user_id]
      @user = User.find_by(id: session[:user_id])
    end
  end

end
