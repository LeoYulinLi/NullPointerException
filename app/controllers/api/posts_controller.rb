class Api::PostsController < ApplicationController

  def update
    post = Post.find_by_id(params[:id])
    revision = if post.question?
                 Revision.new(
                   title: params[:post][:title],
                   body: params[:post][:body],
                   note: params[:post][:note],
                   user: current_user,
                   post: post
                 )
               else
                 Revision.new(
                   body: params[:post][:body],
                   note: params[:post][:note],
                   user: current_user,
                   post: post
                 )
               end
    if revision.save
      render json: {}, status: 204
    else
      p revision.errors.full_messages
      render json: revision.errors.full_messages, status: 422
    end
  end

  def destroy
    post = Post.find_by_id(params[:id])

    if post.question? && post.question.answer_count != 0
      render json: [
        'You cannot delete this post because it has already been answered'
      ], status: 403
      return
    end

    if post.users.where.not(id: current_user.id).count != 0
      render json: [
        'You cannot delete this post because it has already been edited by other users'
      ], status: 403
      return
    end

    post.destroy!

  end

end
