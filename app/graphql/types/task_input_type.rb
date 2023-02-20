# frozen_string_literal: true

module Types
  class TaskInputType < Types::BaseInputObject
    argument :name, String, required: false
    argument :completed, Boolean, required: false
    argument :project_id, Integer, required: false
  end
end
