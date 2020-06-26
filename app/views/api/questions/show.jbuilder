json.set! 'post_currents' do
  @posts.each do |post|
    json.set! post.id do
      json.set! 'question_id', post.question_id
      json.set! 'post_id', post.id
      json.set! 'revision_id', post.current.id
      json.set! 'title', post.current.title if post.question?
      json.set! 'is_question', post.question?
      json.set! 'created_at', post.first.created_at
      json.set! 'updated_at', post.current.created_at
      json.set! 'author_ids' do
        json.array! post.users.map(&:id)
      end
      json.extract! post.current, :body, :note
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