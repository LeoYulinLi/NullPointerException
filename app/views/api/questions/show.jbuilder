json.set! 'posts' do
  @posts.each do |post|
    json.set! post.id do
      json.extract! post, :id, :question_id
    end
  end
end
json.set! 'revisions' do
  @thread.each do |revision|
    json.set! revision.id do
      json.extract! revision, :id, :title, :body, :note, :user_id,:post_id, :created_at
    end
  end
end