# frozen_string_literal: true

module Mutations
  class TaskRemove < BaseMutation
    description 'Removes a task'

    field :task, Types::TaskType, null: false

    argument :id, Integer, required: true

    def resolve(id:)
      user = context[:current_user]
      raise GraphQL::ExecutionError, 'Unauthorized: Please log in' unless user

      task = ::Task.joins(:project)
                   .where(projects: { user_id: user.id, deleted_at: nil })
                   .where(deleted_at: nil)
                   .find(id)

      unless task.update(deleted_at: Time.current)
        raise GraphQL::ExecutionError.new 'Error removing task', extensions: task.errors.to_hash
      end

      { task: task }
    end
  end
end
