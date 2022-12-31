# frozen_string_literal: true

Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/gql'
  end

  post "/graphql", to: "graphql#execute"
  resources :sessions, only: [:create]
end
