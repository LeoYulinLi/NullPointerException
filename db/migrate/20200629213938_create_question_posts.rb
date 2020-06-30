class CreateQuestionPosts < ActiveRecord::Migration[5.2]
  def change
    create_view :question_posts
  end
end
