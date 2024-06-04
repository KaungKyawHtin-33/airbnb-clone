user = User.where(email: "test_1@gmail.com").first_or_initialize
user.update!(
  password: "password",
  password_confirmation: "password"
)

6.times do |i|
  property = Property.create!({
    name: Faker::Lorem.unique.sentence(word_count: 6),
    headline: Faker::Lorem.sentence(word_count: 6),
    description: Faker::Lorem.paragraph(sentence_count: 10),
    address_1: Faker::Address.street_address,
    address_2: Faker::Address.secondary_address,
    city: Faker::Address.city,
    state: Faker::Address.state,
    country: Faker::Address.country,
    price: Money.from_amount((50..100).to_a.sample, 'USD')
  })

  property.images.attach(io: File.open("db/images/property_#{i + 1}.png"), filename: property.name)
  property.images.attach(io: File.open("db/images/property_#{i + 7}.png"), filename: property.name)

  (5..10).to_a.sample.times do 
    Review.create!({
      content: Faker::Lorem.sentence(word_count: 6),
      cleanliness_rating: (1..5).to_a.sample,
      accuracy_rating: (1..5).to_a.sample,
      check_in_rating: (1..5).to_a.sample,
      communication_rating: (1..5).to_a.sample,
      location_rating: (1..5).to_a.sample,
      value_rating: (1..5).to_a.sample,
      property: property,
      user: user
    })
  end
end