class Question < ApplicationRecord

  has_many :posts

  has_many :revisions,
           through: :posts,
           class_name: 'Revision'

end
