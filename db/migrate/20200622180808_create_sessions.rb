class CreateSessions < ActiveRecord::Migration[5.2]
  def change
    create_table :sessions do |t|
      t.references :user, foreign_key: true, null: false
      t.string :session_token, null: false, index: { unique: true }
      t.text :info, null: false

      t.timestamps null: false
    end
  end
end
