class Post < ApplicationRecord

  belongs_to :question

  has_many :revisions,
           dependent: :delete_all

  has_many :users,
           through: :revisions,
           class_name: 'User'

  def current
    revisions.last
  end

  def question?
    question.post.id == id
  end

  def first
    revisions.first
  end

  before_destroy do
    @question_ref = question if question.post.id == id
  end

  after_destroy do
    @question_ref&.destroy
  end

end
