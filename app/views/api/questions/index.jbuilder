users = Hash.new
json.set! 'questions' do
  @all_questions.each do |question|
    json.set! question.id do
      json.set! 'question_id', question.id
      json.set! 'answer_count', question.answer_count
      json.set! 'vote_count', question.score
      json.set! 'title', question.title
      json.set! 'last_action' do
        if question.answer_count.zero? && question.created_at == question.updated_at
          json.set! 'action', 'asked'
        elsif question.active_created_at == question.active_updated_at
          json.set! 'action', 'answered'
        else
          json.set! 'action', 'modified'
        end
        unless users[question.active_by]
          users[question.active_by] = question.user
        end
        json.set! 'user_id', question.active_by
        json.set! 'at', question.active_updated_at
      end
    end
  end
end
json.set! 'users' do
  users.each do |id, user|
    json.set! id do
      json.partial! '/api/users/user', user: user
    end
  end
end