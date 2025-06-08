# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :sign_in, mutation: Mutations::Login

    field :create_project, mutation: Mutations::ProjectCreate
    field :update_project, mutation: Mutations::ProjectUpdate
    field :remove_project, mutation: Mutations::ProjectRemove
    field :update_project_position, mutation: Mutations::ProjectUpdatePosition

    field :create_task, mutation: Mutations::TaskCreate
    field :update_task, mutation: Mutations::TaskUpdate
    field :remove_task, mutation: Mutations::TaskRemove
    field :update_task_position, mutation: Mutations::TaskUpdatePosition
  end
end
