class Api::AnswersController < ApplicationController

  def create
    question = Question.find_by_id(params[:question_id])
    render json: ['Question not found'], status: 404 unless question

    post = Post.new(question: question)
    revision = Revision.new(
      body: params[:post][:body],
      note: 'initial post',
      user: current_user,
      post: post
    )
    if revision.save
      render json: {}, status: 204
    else
      render json: revision.errors.full_messages, status: 422
    end
  end

end
