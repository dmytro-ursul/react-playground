# frozen_string_literal: true

module Mutations
  class ProjectRemove < BaseMutation
    description 'Removes a project'

    field :project, Types::ProjectType, null: true

    argument :id, Integer, required: true

    def resolve(id:)
      project = ::Project.find(id)
      unless project.destroy
        raise GraphQL::ExecutionError.new 'Error removing project',
                                          extensions: project.errors.to_hash
      end

      { project: project }
    end
  end
end
