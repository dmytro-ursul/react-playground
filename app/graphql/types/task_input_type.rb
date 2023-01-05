# frozen_string_literal: true

module Types
  class TaskInputType < Types::BaseInputObject
    argument :id, ID, required: false
    argument :name, String, required: false
    argument :completed, Boolean, required: false
    argument :project_id, Integer, required: false
    argument :created_at, GraphQL::Types::ISO8601DateTime, required: false
    argument :updated_at, GraphQL::Types::ISO8601DateTime, required: false
  end
end
