# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_06_30_004154) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "posts", force: :cascade do |t|
    t.bigint "question_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["question_id"], name: "index_posts_on_question_id"
  end

  create_table "questions", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "revisions", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "note", null: false
    t.string "title"
    t.text "body", null: false
    t.bigint "post_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["post_id"], name: "index_revisions_on_post_id"
    t.index ["user_id"], name: "index_revisions_on_user_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "session_token", null: false
    t.text "info", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["session_token"], name: "index_sessions_on_session_token", unique: true
    t.index ["user_id"], name: "index_sessions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "email", null: false
    t.string "display_name", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  create_table "votes", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.integer "amount", null: false
    t.string "target_type"
    t.bigint "target_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["target_id", "target_type", "user_id"], name: "index_votes_on_target_id_and_target_type_and_user_id", unique: true
    t.index ["target_type", "target_id"], name: "index_votes_on_target_type_and_target_id"
    t.index ["user_id"], name: "index_votes_on_user_id"
  end

  add_foreign_key "posts", "questions"
  add_foreign_key "revisions", "posts"
  add_foreign_key "revisions", "users"
  add_foreign_key "sessions", "users"
  add_foreign_key "votes", "users"

  create_view "question_posts", sql_definition: <<-SQL
      SELECT DISTINCT ON (posts.question_id) posts.question_id AS id,
      posts.id AS post_id
     FROM posts
    ORDER BY posts.question_id, posts.id;
  SQL
  create_view "current_posts", sql_definition: <<-SQL
      SELECT DISTINCT ON (posts.id) posts.id,
      posts.question_id,
      current.title,
      current.body,
      first.user_id AS author,
      current.user_id AS editor,
      COALESCE(vote_summary.score, (0)::bigint) AS score,
      first.created_at,
      current.created_at AS updated_at
     FROM (((posts
       JOIN revisions current ON ((posts.id = current.post_id)))
       JOIN revisions first ON ((posts.id = first.post_id)))
       LEFT JOIN ( SELECT votes.target_id,
              sum(votes.amount) AS score
             FROM votes
            WHERE ((votes.target_type)::text = 'Post'::text)
            GROUP BY votes.target_id) vote_summary ON ((vote_summary.target_id = posts.id)))
    ORDER BY posts.id, first.id, current.id DESC;
  SQL
  create_view "current_questions", sql_definition: <<-SQL
      SELECT DISTINCT ON (questions.id) questions.id,
      question_post.id AS post_id,
      question_post.title,
      question_post.body,
      COALESCE(question_post.score, (0)::bigint) AS score,
      COALESCE((post_count.count - 1), (0)::bigint) AS answer_count,
      question_post.author AS owner,
      all_posts.id AS active_id,
      all_posts.author AS active_by,
      question_post.created_at,
      question_post.updated_at,
      all_posts.created_at AS active_created_at,
      all_posts.updated_at AS active_updated_at
     FROM (((questions
       JOIN current_posts question_post ON ((questions.id = question_post.question_id)))
       JOIN current_posts all_posts ON ((questions.id = all_posts.question_id)))
       LEFT JOIN ( SELECT posts.question_id AS qid,
              count(*) AS count
             FROM posts
            GROUP BY posts.question_id) post_count ON ((post_count.qid = question_post.question_id)))
    ORDER BY questions.id, question_post.id, all_posts.updated_at DESC;
  SQL
end
