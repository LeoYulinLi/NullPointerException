class Session < ApplicationRecord

  validates :user_id, :session_token, :info, presence: true
  validates :session_token, uniqueness: true

  belongs_to :user


end
