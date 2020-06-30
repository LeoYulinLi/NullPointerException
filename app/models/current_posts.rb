class CurrentPosts < ActiveRecord::Base

  self.primary_key = :id

  belongs_to :author,
             foreign_key: :author,
             class_name: 'User'

  belongs_to :editor,
             foreign_key: :editor,
             class_name: 'User'

  def voted_by?(user)
    Vote.find_by(user: user, target_id: id, target_type: 'Post')
  end

  def question?

  end

  def readonly?
    true
  end

end