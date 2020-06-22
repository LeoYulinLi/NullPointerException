class User < ApplicationRecord

  validates :username, :email, :display_name, :password_digest, presence: true
  validates :username, :email, uniqueness: true

  validates :username, length: { minimum: 3 }
  validates :password, length: { minimum: 8 }

  # @param [String] password
  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  # @param [String] password
  def valid_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  # @param [String] username
  def username=(username)
    self.username = username
    self.display_name = username
  end

  # @param [String] username
  # @param [String] password
  # @return [User, nil]
  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    user if user&.valid_password?(password)
  end

end
