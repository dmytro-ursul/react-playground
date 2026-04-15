# frozen_string_literal: true

module Mutations
  class LogoutAll < BaseMutation
    description 'Revoke all sessions for the current user'

    field :revoked_count, Integer, null: false

    def resolve
      user = context[:current_user]
      raise GraphQL::ExecutionError, 'Not authenticated' unless user

      count = user.sessions.active.where.not(id: context[:current_session]&.id).update_all(revoked_at: Time.current)
      { revoked_count: count }
    end
  end
end
