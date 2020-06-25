class Api::QuestionsController < ApplicationController

  before_action :require_logged_in, only: :create

  def create
    question = Question.new
    post = Post.new(question: question)
    revision = Revision.new(
      title: params[:question][:title],
      body: params[:question][:body],
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

  def index
    @all_questions = Question.all.includes(:posts)
    @question_posts = @all_questions.map { |question| question.posts.first }
    @revisions = @question_posts.map(&:current)
    @authors = @revisions.map(&:user)
    render :index
  end

  def show
    @question_id = params[:id]
    @posts = Post.where(question_id: @question_id).includes(:revisions)
    @thread = @posts.map(&:current)
    @authors = @thread.map(&:user)
    render :show
  end

end
