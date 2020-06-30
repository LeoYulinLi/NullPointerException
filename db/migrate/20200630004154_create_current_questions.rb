class CreateCurrentQuestions < ActiveRecord::Migration[5.2]
  def change
    create_view :current_questions
  end
end
