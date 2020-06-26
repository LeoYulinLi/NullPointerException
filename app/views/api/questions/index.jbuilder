json.set! 'questions' do
  @question_posts.each do |post|
    question = post.question
    json.set! post.question_id do
      json.set! 'question_id', question.id
      json.set! 'post_id', post.id
      json.set! 'edited', question.edited?
      json.set! 'answer_count', question.answer_count
      json.set! 'vote_count', question.vote_count
    end
  end
end
json.set! 'posts' do
  @revisions.each do |revision|
    json.set! revision.post_id do
      json.set! 'post_id', revision.post_id
      json.set! 'revision_id', revision.id
    end
  end
end
json.set! 'revisions' do
  @revisions.each do |revision|
    json.set! revision.id do
      json.extract! revision, :id, :title, :body, :note, :user_id,:post_id, :created_at
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