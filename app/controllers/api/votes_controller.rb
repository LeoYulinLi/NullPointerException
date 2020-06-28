class Api::VotesController < ApplicationController

  before_action :require_logged_in, only: %i[create destroy]

  def index
    target = find_target
    @votes = Vote.where(target: target)
    @user_vote = Vote.find_by_user_id(current_user.id)
  end

  def create
    amount = if params[:vote] && params[:vote][:action] == 'up'
               1
             elsif params[:vote] && params[:vote][:action] == 'down'
               -1
             end

    target = find_target

    vote = Vote.new(
      user: current_user,
      amount: amount,
      target: target
    )

    ActiveRecord::Base.transaction do
      old_vote = Vote.find_by(user: current_user, target: target)
      old_vote&.delete
      if vote.save
        render json: {}, status: 204
      else
        render json: vote.errors.full_messages, status: 422
      end
    end
  end

  def destroy
    target = find_target
    old_vote = Vote.find(user: current_user, target: target)
    old_vote.delete
  end

  private

  def find_target
    Post.find_by_id(params[:post_id]) if params[:post_id]
  end

end
