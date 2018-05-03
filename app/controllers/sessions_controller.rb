class SessionsController < ApplicationController

  def create
    auth_hash = request.env['omniauth.auth']

    if auth_hash['uid']
      @user = User.find_by(uid: auth_hash[:uid], provider: 'github')
      if @user.nil?
        user = User.from_auth_hash(auth_hash[:provider], auth_hash)
        user.save
      else
        flash[:status] = :success
        flash[:result_text] = "Successfully logged in as existing user #{user.username}"
      end

      session[:user_id] = @user.id
      redirect_to root_path
    else
      flash.now[:status] = :failure
      flash.now[:result_text] = "Could not log in"
      flash.now[:messages] = user.errors.messages
      redirect_to root_path
    end
  end

  def logout
    session[:user_id] = nil
    flash[:status] = :success
    flash[:result_text] = "Successfully logged out"
    redirect_to root_path
  end

  def index
    @user = User.find(session[:user_id]) # < recalls the value set in a previous request
  end
end
