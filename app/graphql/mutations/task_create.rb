# frozen_string_literal: true

module Mutations
  class TaskCreate < BaseMutation
    description 'Creates a new task'

    field :task, Types::TaskType, null: false

    argument :name, String, required: true
    argument :project_id, Integer, required: true
    argument :due_date, GraphQL::Types::ISO8601Date, required: false

    def resolve(name:, project_id:, due_date: nil)
      task = ::Task.new(
        name: name,
        project_id: project_id,
        completed: false,
        due_date: due_date
      )
      unless task.save
        raise GraphQL::ExecutionError.new 'Error creating task', extensions: task.errors.to_hash
      end

      { task: task }
    end
  end
end
