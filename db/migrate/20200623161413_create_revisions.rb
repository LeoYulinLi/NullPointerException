class CreateRevisions < ActiveRecord::Migration[5.2]
  def change
    create_table :revisions do |t|
      t.references :user, foreign_key: true, null: false, index: true
      t.string :note, null: false
      t.string :title
      t.text :body, null: false
      t.references :post, foreign_key: true, null: false, index: true

      t.timestamps null: false
    end
    add_index :revisions, %i[target_type target_id]
  end
end
