# frozen_string_literal: true

module Mutations
  class TaskUpdate < BaseMutation
    description "Updates a task"

    field :task, Types::TaskType, null: false

    argument :task_input, Types::TaskInputType, required: true

    def resolve(task_input:)
      task = ::Task.find(task_input[:id])
      raise GraphQL::ExecutionError.new "Error updating task", extensions: task.errors.to_hash unless task.update(task_input.to_h)

      { task: task }
    end
  end
end
