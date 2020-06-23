json.set! 'questions' do
  json.array! @all_questions.map(&:id)
end
json.set! 'posts' do
  @question_posts.each do |post|
    json.set! post.id do
      json.extract! post, :id, :question_id
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