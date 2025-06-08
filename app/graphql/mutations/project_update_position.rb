# frozen_string_literal: true

module Mutations
  class ProjectUpdatePosition < BaseMutation
    argument :id, ID, required: true
    argument :position, Integer, required: true

    field :project, Types::ProjectType, null: true
    field :errors, [String], null: false

    def resolve(id:, position:)
      project = Project.find(id)
      
      if project.move_to_position(position)
        {
          project: project,
          errors: []
        }
      else
        {
          project: nil,
          errors: project.errors.full_messages
        }
      end
    rescue ActiveRecord::RecordNotFound
      {
        project: nil,
        errors: ['Project not found']
      }
    end
  end
end