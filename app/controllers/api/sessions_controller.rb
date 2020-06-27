class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
    if @user
      # TODO: refactor out login logic
      token = SecureRandom.urlsafe_base64
      Session.create!(user: @user, session_token: token, info: {})
      session[:session_token] = token
      render 'api/users/show'
    else
      render json: ['Invalid username or password'], status: 401
    end
  end

  def show
    @user = User.find_by_session_token(session[:session_token])
    if @user
      render 'api/users/show'
    else
      render json: ["Unauthorized access"], status: 401
    end
  end

  def destroy
    Session.find_by_session_token(session[:session_token]).destroy
    render json: {}, status: 204
  end

end
