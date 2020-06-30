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

10.times do
  ActiveRecord::Base.transaction do
    question = Question.new
    post = Post.new(question: question)
    content = <<~TEXT
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

1000.times do
  choice = Random.rand(0..10)
  case choice
  when 0..1
    ActiveRecord::Base.transaction do
      question = Question.new
      post = Post.new(question: question)
      content = <<~TEXT
        #{Faker::Markdown.random}

        #{Faker::Markdown.random}

        #{Faker::Markdown.random}

        #{Faker::Markdown.random}

        #{Faker::Markdown.random}

        #{Faker::Markdown.random}
      TEXT
      Revision.create(
        title: Faker::Lorem.sentence(word_count: 3, supplemental: false, random_words_to_add: 10),
        body: content,
        note: 'initial post',
        user_id: Random.rand(1..User.count),
        post: post
      )
    end
  when 1..2
    post = Post.find_by_id(Random.rand(1..Post.count))
    content = <<~TEXT
      #{Faker::Markdown.random}

      #{Faker::Markdown.random}

      #{Faker::Markdown.random}
    TEXT
    Revision.create(
      title: Faker::Lorem.sentence(word_count: 3, supplemental: false, random_words_to_add: 10),
      body: content,
      note: Faker::Lorem.sentence(word_count: 3, supplemental: false, random_words_to_add: 2),
      user_id: Random.rand(1..User.count),
      post: post
    )
  when 2..5
    question = Question.find_by_id(Random.rand(1..Question.count))

    content = <<~TEXT
      #{Faker::Markdown.random}
      #{Faker::Markdown.random}
      #{Faker::Markdown.random}
    TEXT

    post = Post.create(question: question)
    Revision.create(
      body: content,
      note: 'initial post',
      user_id: Random.rand(1..User.count),
      post: post
    )
  else
    post = Post.find_by_id(Random.rand(1..Post.count))
    user_id = Random.rand(1..User.count)
    has_vote = Vote.find_by(user_id: user_id, target: post)
    unless has_vote
      vote = Vote.new(
        user_id: user_id,
        amount: [1, -1].sample,
        target: post
      )
      vote.save
    end
  end
end
