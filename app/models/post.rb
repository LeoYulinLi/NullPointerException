class Post < ApplicationRecord

  belongs_to :question

  has_many :revisions

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

end
