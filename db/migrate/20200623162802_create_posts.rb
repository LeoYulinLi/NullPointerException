class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.references :question, foreign_key: true, null: false, index: true
      t.timestamps null: false
    end
  end
end
