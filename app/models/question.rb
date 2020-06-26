class Question < ApplicationRecord

  has_many :posts

  has_many :revisions,
           through: :posts,
           class_name: 'Revision'

  has_many :users,
           through: :posts,
           source: :users,
           class_name: 'User'

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
