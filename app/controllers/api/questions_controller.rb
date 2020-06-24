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
    @posts = Post.where(question_id: params[:id]).includes(:revisions)
    @thread = @posts.map(&:current)
    render :show
  end

  def update
    post = Post.find_by_question_id(params[:id])
    revision = Revision.new(
      title: params[:question][:title],
      body: params[:question][:body],
      note: params[:question][:note],
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
