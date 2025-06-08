# frozen_string_literal: true

module Mutations
  class TaskUpdatePosition < BaseMutation
    argument :id, ID, required: true
    argument :position, Integer, required: true

    field :task, Types::TaskType, null: true
    field :errors, [String], null: false

    def resolve(id:, position:)
      task = Task.find(id)
      
      if task.move_to_position(position)
        {
          task: task,
          errors: []
        }
      else
        {
          task: nil,
          errors: task.errors.full_messages
        }
      end
    rescue ActiveRecord::RecordNotFound
      {
        task: nil,
        errors: ['Task not found']
      }
    end
  end
end