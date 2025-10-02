# Create demo user for production
# Strong password: Password123!
if Rails.env.production?
  unless User.exists?(username: "john.doe")
    User.create!(
      email: "john.doe@test.com",
      username: "john.doe",
      first_name: "John",
      last_name: "Doe",
      password: "Password123!"
    )
    puts "Production demo user created successfully!"
    puts "Login credentials: username: john.doe, password: Password123!"
  else
    puts "Production demo user already exists, skipping creation."
  end
else
  # Create demo user and sample data for other environments
  unless User.exists?(username: "john.doe")
    user = User.create!(
      email: "john.doe@test.com",
      username: "john.doe",
      first_name: "John",
      last_name: "Doe",
      password: "Password123!"
    )

    # Create sample projects and tasks for demo
    project1 = Project.create!(
      name: "Frontend Development",
      user: user
    )

    project2 = Project.create!(
      name: "Backend API",
      user: user
    )

    # Tasks for Frontend Development
    Task.create!(
      name: "Add task completion feature",
      completed: false,
      project: project1,
      due_date: Date.today + 3.days
    )

    Task.create!(
      name: "Update React dependencies",
      completed: true,
      project: project1,
      due_date: Date.today - 2.days
    )

    Task.create!(
      name: "Fix CSS styling issues",
      completed: false,
      project: project1,
      due_date: Date.today + 7.days
    )

    Task.create!(
      name: "Write unit tests",
      completed: false,
      project: project1,
      due_date: Date.today + 14.days
    )

    # Tasks for Backend API
    Task.create!(
      name: "Setup GraphQL mutations",
      completed: true,
      project: project2,
      due_date: Date.today - 5.days
    )

    Task.create!(
      name: "Add user authentication",
      completed: true,
      project: project2,
      due_date: Date.today - 3.days
    )

    Task.create!(
      name: "Implement task CRUD operations",
      completed: false,
      project: project2,
      due_date: Date.today + 5.days
    )

    Task.create!(
      name: "Deploy to Railway",
      completed: false,
      project: project2,
      due_date: Date.today + 10.days
    )

    puts "Demo user and sample data created successfully!"
  else
    puts "Demo user already exists, skipping seed data creation."
  end
end
