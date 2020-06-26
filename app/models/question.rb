class Question < ApplicationRecord

  has_many :posts

  has_many :revisions,
           through: :posts,
           class_name: 'Revision'

  def edited?
    revisions.count > 1
  end

  def answer_count
    posts.count - 1
  end

  def vote_count
    0
  end

  def post
    posts.first
  end

end
