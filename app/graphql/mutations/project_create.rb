# frozen_string_literal: true

module Mutations
  class ProjectCreate < BaseMutation
    description "Creates a new project"

    field :project, Types::ProjectType, null: false

    argument :name, String, required: true

    def resolve(name:)
      project = ::Project.new(name: name, user_id: context[:current_user].id)
      raise GraphQL::ExecutionError.new "Error creating project", extensions: project.errors.to_hash unless project.save


      { project: project }
    end
  end
end
