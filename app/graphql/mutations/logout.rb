# frozen_string_literal: true

module Mutations
  class Logout < BaseMutation
    description 'Revoke the current session'

    field :success, Boolean, null: false

    def resolve
      session = context[:current_session]
      raise GraphQL::ExecutionError, 'Not authenticated' unless session

      session.revoke!
      { success: true }
    end
  end
end
