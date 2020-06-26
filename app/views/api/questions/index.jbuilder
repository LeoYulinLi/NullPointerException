users = []
json.set! 'questions' do
  @all_questions.each do |question|
    json.set! question.id do
      json.set! 'question_id', question.id
      json.set! 'answer_count', question.answer_count
      json.set! 'vote_count', question.vote_count
      json.set! 'title', question.post.current.title
      json.set! 'last_action' do
        if question.post.revisions.last.id == question.revisions.last.id
          json.set! 'action', 'asked'
        elsif question.posts.last.revisions.first.id == question.posts.last.revisions.last.id
          json.set! 'action', 'answer'
        else
          json.set! 'action', 'modified'
        end
        user = question.revisions.last.user
        users << user
        json.set! 'user_id', user.id
        json.set! 'at', question.revisions.last.created_at
      end
    end
  end
end
json.set! 'users' do
  users.each do |user|
    json.set! user.id do
      json.partial! '/api/users/user', user: user
    end
  end
end