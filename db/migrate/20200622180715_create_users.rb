class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :username, null: false, index: { unique: true }
      t.string :email, null: false, index: { unique: true }
      t.string :display_name, null: false
      t.string :password_digest, null: false

      t.timestamps null: false
    end
  end
end
