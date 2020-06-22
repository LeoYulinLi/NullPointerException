@users.each do |user|
  json.set! user.id do
    json.partial! 'users/user', user: user
  end
end