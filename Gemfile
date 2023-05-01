# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.1.2'

gem 'annotate'
gem 'bcrypt', '~> 3.1.7'
gem 'bootsnap', require: false
gem 'graphql'
gem 'graphiql-rails'
gem 'jwt'
gem 'pg', '~> 1.4'
gem 'puma', '~> 6.2'
gem 'rack-cors'
gem 'rails'
gem 'pry-rails'
gem 'pry-nav'
gem 'pry-stack_explorer'

# Build JSON APIs with ease [https://github.com/rails/jbuilder]
# gem "jbuilder"
# gem "redis", "~> 4.0"

# Use Kredis to get higher-level data types in Redis [https://github.com/rails/kredis]
# gem "kredis"

# Use Active Storage variants [https://guides.rubyonrails.org/active_storage_overview.html#transforming-images]
# gem "image_processing", "~> 1.2"

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem 'debug', platforms: %i[mri mingw x64_mingw]
end

group :development do
  gem 'brakeman', require: false
  gem 'rubocop', require: false
  gem 'rubocop-performance', require: false
  gem 'rubocop-rails', require: false
  gem 'rubocop-rake', require: false
  gem 'rubocop-rspec', require: false
end
