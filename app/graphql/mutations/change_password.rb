# frozen_string_literal: true

module Mutations
  class ChangePassword < BaseMutation
    description 'Changes user password with strong password validation'

    field :user, Types::UserType, null: false
    field :message, String, null: false

    argument :current_password, String, required: true
    argument :new_password, String, required: true
    argument :new_password_confirmation, String, required: true

    def resolve(current_password:, new_password:, new_password_confirmation:)
      user = context[:current_user]
      
      unless user
        raise GraphQL::ExecutionError, 'You must be logged in to change password'
      end

      # Verify current password
      unless user.authenticate(current_password)
        raise GraphQL::ExecutionError, 'Current password is incorrect'
      end

      # Check password confirmation
      unless new_password == new_password_confirmation
        raise GraphQL::ExecutionError, 'New password and confirmation do not match'
      end

      # Update password (will trigger strong password validation)
      user.password = new_password
      
      unless user.save
        error_messages = user.errors.full_messages.join(', ')
        raise GraphQL::ExecutionError, error_messages
      end

      {
        user: user,
        message: 'Password changed successfully'
      }
    end
  end
end
