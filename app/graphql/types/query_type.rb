# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.
    field :projects, [ProjectType], 'Returns all projects', null: false

    field :project, ProjectType, 'Returns a project', null: false do
      argument :id, ID, required: true
    end

    field :current_user, UserType, 'Returns the currently logged in user', null: true

    def projects
      raise GraphQL::ExecutionError, 'Unauthorized: Please log in' unless context[:current_user].present?
      context[:current_user].projects.ordered
    end

    def project(id:)
      raise GraphQL::ExecutionError, 'Unauthorized: Please log in' unless context[:current_user].present?
      context[:current_user].projects.find(id)
    end

    def current_user
      context[:current_user]
    end
  end
end
