class Api::UsersController < ApplicationController

  def create
    @user = User.new(create_params)
    if @user.save
      # TODO: refactor out login logic
      token = SecureRandom.urlsafe_base64
      Session.create!(user: @user, session_token: token, info: {})
      session[:session_token] = token
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def index
    @users = User.all
    render :index
  end

  def show
    @user = User.find_by_id(params[:id])
    if @user
      render :show
    else
      render json: ["User Not Found"], status: 404
    end
  end

  def update
    @user = User.find_by_id(params[:id])
    if @user&.update(edit_params)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def create_params
    params.require(:user).permit(:username, :display_name, :password, :email)
  end

  def edit_params
    params.require(:user).permit(:display_name, :password, :email)
  end

end
