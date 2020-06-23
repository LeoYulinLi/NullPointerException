class Post < ApplicationRecord

  belongs_to :question

  has_many :revisions

end
