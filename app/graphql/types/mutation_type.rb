module Types
  class MutationType < Types::BaseObject
    field :task_create, mutation: Mutations::TaskCreate
    field :create_project, mutation: Mutations::ProjectCreate
    field :remove_project, mutation: Mutations::ProjectRemove
  end
end
