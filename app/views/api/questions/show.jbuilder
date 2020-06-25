json.set! 'post_currents' do
  @thread.each do |revision|
    json.set! revision.post_id do
      json.set! 'question_id', @question_id
      json.set! 'post_id', revision.post_id
      json.set! 'revision_id', revision.id
      json.set! 'title', revision.title if revision.title
      json.extract! revision, :body, :note, :user_id, :created_at
    end
  end
end
json.set! 'users' do
  @authors.each do |user|
    json.set! user.id do
      json.partial! '/api/users/user', user: user
    end
  end
end