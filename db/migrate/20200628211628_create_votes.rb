class CreateVotes < ActiveRecord::Migration[5.2]
  def change
    create_table :votes do |t|
      t.references :user, foreign_key: true, index: true, null: false
      t.integer :amount, null: false
      t.references :target, polymorphic: true

      t.timestamps null: false
    end
    add_index :votes, [:target_id, :target_type, :user_id], unique: true
  end
end
