module Mutations
  class ProjectRemove < BaseMutation
    description "Removes a project"

    field :project, Types::ProjectType, null: true

    argument :id, Integer, required: true

    def resolve(id:)
      project = ::Project.find(id)
      raise GraphQL::ExecutionError.new "Error removing project", extensions: project.errors.to_hash unless project.destroy

      { project: project }
    end
  end
end
