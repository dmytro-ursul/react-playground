# frozen_string_literal: true

module Mutations
  class ProjectRemove < BaseMutation
    description 'Removes a project'

    field :project, Types::ProjectType, null: true

    argument :id, Integer, required: true

    def resolve(id:)
      user = context[:current_user]
      raise GraphQL::ExecutionError, 'Unauthorized: Please log in' unless user

      project = user.projects.visible.find(id)

      unless project.update(deleted_at: Time.current)
        raise GraphQL::ExecutionError.new 'Error removing project', extensions: project.errors.to_hash
      end

      ::Task.where(project_id: project.id).update_all(deleted_at: Time.current)

      { project: project }
    end
  end
end
