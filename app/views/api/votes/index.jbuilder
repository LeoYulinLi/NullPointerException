json.set! 'votes' do
  json.set! 'score', @votes.sum(:amount)
  json.set! 'voted', @user_vote.amount == 1 ? 'up' : 'down' if @user_vote
end