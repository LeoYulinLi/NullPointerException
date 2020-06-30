class CurrentQuestion < ActiveRecord::Base

  self.primary_key = :id

  belongs_to :user,
             foreign_key: :active_by,
             class_name: 'User'

  def readonly?
    true
  end

end