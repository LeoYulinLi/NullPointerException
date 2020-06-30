# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all

User.create(username: 'demo', password: 'demodemodemo', email: 'demo@demo.demo')
100.times do
  User.create(
    username: Faker::Name.name,
    password: "asdfasdfasdf",
    email: Faker::Internet.email
  )
end

50.times do
  ActiveRecord::Base.transaction do
    question = Question.new
    post = Post.new(question: question)
    content = <<-TEXT
    #{Faker::Markdown.random}
    #{Faker::Markdown.random}
    #{Faker::Markdown.random}
    TEXT
    Revision.create(
      title: Faker::Lorem.sentence(word_count: 3, supplemental: false, random_words_to_add: 10),
      body: content,
      note: 'initial post',
      user_id: Random.rand(1..50),
      post: post
    )
  end
end

50.times do
  question = Question.find_by_id(Random.rand(0..50))

  content = <<-TEXT
    #{Faker::Markdown.random}
    #{Faker::Markdown.random}
    #{Faker::Markdown.random}
  TEXT

  post = Post.create(question: question)
  Revision.create(
    body: content,
    note: 'initial post',
    user_id: Random.rand(1..50),
    post: post
  )
end

10.times do
  question = Question.new
  post = Post.new(question: question)
  content = <<-TEXT
    #{Faker::Markdown.random}
    #{Faker::Markdown.random}
    #{Faker::Markdown.random}
  TEXT
  Revision.create(
    title: Faker::Lorem.sentence(word_count: 3, supplemental: false, random_words_to_add: 10),
    body: content,
    note: 'initial post',
    user_id: Random.rand(1..50),
    post: post
  )
end

300.times do
  post = Post.find_by_id(Random.rand(0...110))
  content = <<-TEXT
    #{Faker::Markdown.random}
    #{Faker::Markdown.random}
    #{Faker::Markdown.random}
  TEXT
  Revision.create(
    title: Faker::Lorem.sentence(word_count: 3, supplemental: false, random_words_to_add: 10),
    body: content,
    note: Faker::Lorem.sentence(word_count: 3, supplemental: false, random_words_to_add: 2),
    user_id: Random.rand(1..50),
    post: post
  )
end
