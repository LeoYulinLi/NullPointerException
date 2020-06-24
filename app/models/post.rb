class Post < ApplicationRecord

  belongs_to :question

  has_many :revisions

  def current
    Revision.where(post_id: id).last
  end

end
