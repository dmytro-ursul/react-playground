# frozen_string_literal: true

module Types
  class ProjectType < Types::BaseObject
    description "A project"

    field :id, Integer, null: false
    field :name, String, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :tasks, [TaskType], null: false
  end
end
