json.set! 'questions' do
  @question_posts.each do |post|
    json.set! post.question_id do
      json.set! 'question_id', post.question_id
      json.set! 'post_id', post.id
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