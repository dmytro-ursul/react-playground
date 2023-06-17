user = User.create!(
    email: "john.doe@test.com",
    username: "john.doe",
    first_name: "John",
    last_name: "Doe",
    password: "password"
)

2.times do
    project = Project.create!(
        name: Faker::Lorem.sentence(word_count: 3),
        user: user
    )
    5.times do
        Task.create!(
            name: Faker::Lorem.sentence(word_count: 3),
            completed: Faker::Boolean.boolean,
            project: project
        )
    end
end

3000.times do |i|
    user = User.create!(
        email: Faker::Internet.email,
        username: Faker::Internet.username + rand(1..1000).to_s,
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        password: "password"
    )

    rand(1..5).times do
        project = Project.create!(
            name: Faker::Lorem.sentence(word_count: 3),
            user: user
        )
        rand(2..10).times do
            Task.create!(
                name: Faker::Lorem.sentence(word_count: 3),
                completed: Faker::Boolean.boolean,
                project: project
            )
        end
    end
end
