# frozen_string_literal: true

Rails.application.routes.draw do
  mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql' if Rails.env.development?

  # Health check endpoints for Railway
  get "up" => "rails/health#show", as: :rails_health_check
  get "health" => "rails/health#show"

  post '/graphql', to: 'graphql#execute'
  resources :sessions, only: [:create]
end
