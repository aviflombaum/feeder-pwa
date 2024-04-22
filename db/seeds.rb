Feed.delete_all

10.times do
  feed = Feed.create!(
    title: Faker::Book.title,
    url: Faker::Internet.url,
    description: Faker::Lorem.sentence(word_count: 10)
  )

  10.times do
    Item.create!(
      title: Faker::Lorem.sentence(word_count: 5),
      link: Faker::Internet.url,
      published_at: Faker::Time.between(from: 30.days.ago, to: Date.today),
      content: Faker::Lorem.paragraph(sentence_count: 5),
      feed_id: feed.id
    )
  end
end

puts "Created #{Feed.count} feeds with #{Item.count} items."
