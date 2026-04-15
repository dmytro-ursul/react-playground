# frozen_string_literal: true

module Mutations
  class RevokeSession < BaseMutation
    description 'Revoke a specific session by ID'

    argument :session_id, ID, required: true

    field :success, Boolean, null: false

    def resolve(session_id:)
      user = context[:current_user]
      raise GraphQL::ExecutionError, 'Not authenticated' unless user

      session = user.sessions.active.find_by(id: session_id)
      raise GraphQL::ExecutionError, 'Session not found' unless session

      session.revoke!
      { success: true }
    end
  end
end
