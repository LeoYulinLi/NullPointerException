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

  def destroy
    Session.destroy(params[:session_token])
    render nothing: true, status: 204
  end

end
