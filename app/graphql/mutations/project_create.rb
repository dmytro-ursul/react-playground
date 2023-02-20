# frozen_string_literal: true

module Mutations
  class ProjectCreate < BaseMutation
    description "Creates a new project"

    field :project, Types::ProjectType, null: false

    argument :project_input, Types::ProjectInputType, required: true

    def resolve(project_input:)
      project = ::Project.new(**project_input)
      raise GraphQL::ExecutionError.new "Error creating project", extensions: project.errors.to_hash unless project.save


      { project: project }
    end
  end
end
