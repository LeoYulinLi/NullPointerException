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

end
