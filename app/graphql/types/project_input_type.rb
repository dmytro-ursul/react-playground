# frozen_string_literal: true

module Types
  class ProjectInputType < Types::BaseInputObject
    argument :name, String, required: true
  end
end
