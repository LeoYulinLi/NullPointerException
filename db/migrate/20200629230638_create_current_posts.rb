class CreateCurrentPosts < ActiveRecord::Migration[5.2]
  def change
    create_view :current_posts
  end
end
