class Revision < ApplicationRecord

  validates :user_id, :body, :note, presence: true

  belongs_to :user
  belongs_to :post

end
