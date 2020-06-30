json.set! 'post_currents' do
  @posts.each do |post|
    json.set! post.id do
      json.set! 'question_id', post.question_id
      json.set! 'post_id', post.id
      json.set! 'title', post.current.title if post.question?
      json.set! 'is_question', post.question?
      json.set! 'create' do
        json.set! 'user_id', post.author.id
        json.set! 'at', post.created_at
      end
      if post.created_at != post.updated_at
        json.set! 'update' do
          if post.editor.id != post.author.id
            json.set! 'user_id', post.editor.id
          end
          json.set! 'at', post.updated_at
        end
      end
      json.set! 'votes' do
        json.set! 'score', post.score
        vote = post.voted_by?(@user)
        if vote
          json.set! 'voted', vote.amount == 1 ? 'up' : 'down'
        end
      end
      json.extract! post, :body
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