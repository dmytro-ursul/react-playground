# frozen_string_literal: true

module Mutations
  class TaskRemove < BaseMutation
    description 'Removes a task'

    field :task, Types::TaskType, null: false

    argument :id, Integer, required: true

    def resolve(id:)
      task = ::Task.find(id)
      unless task.destroy
        raise GraphQL::ExecutionError.new 'Error removing task', extensions: task.errors.to_hash
      end

      { task: task }
    end
  end
end
