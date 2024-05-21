20.times do 
  Property.create!({
    name: Faker::Lorem.unique.sentence(word_count: 6),
    headline: Faker::Lorem.sentence(word_count: 6),
    description: Faker::Lorem.paragraph(sentence_count: 10),
    address_1: Faker::Address.street_address,
    address_2: Faker::Address.secondary_address,
    city: Faker::Address.city,
    state: Faker::Address.state,
    country: Faker::Address.country
  })
end