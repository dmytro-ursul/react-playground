# frozen_string_literal: true

module Mutations
  class Login < BaseMutation
    include JsonWebToken

    argument :username, String, required: true
    argument :password, String, required: true

    field :token, String, null: true
    field :user, Types::UserType, null: true
    field :requires_two_factor, Boolean, null: false
    field :temp_token, String, null: true

    def resolve(username:, password:)
      user = User.find_by(username: username)

      # Return generic error if user not found (don't reveal if username exists)
      unless user
        raise GraphQL::ExecutionError, 'Invalid username or password'
      end

      # Check if account is locked
      if user.locked?
        raise GraphQL::ExecutionError, user.lockout_message
      end

      # Attempt authentication
      if user.authenticate(password)
        # Check if 2FA is required
        if user.two_factor_required?
          # Issue temporary token for 2FA verification (short-lived)
          temp_token = jwt_encode({ user_id: user.id, temp_token: true }, 5.minutes.from_now)
          
          {
            token: nil,
            user: nil,
            requires_two_factor: true,
            temp_token: temp_token
          }
        else
          # No 2FA - successful login
          user.reset_failed_attempts!
          {
            token: jwt_encode(user_id: user.id),
            user: user,
            requires_two_factor: false,
            temp_token: nil
          }
        end
      else
        # Failed login - record attempt and potentially lock account
        user.record_failed_attempt!

        # Check if account is now locked after this attempt
        if user.locked?
          raise GraphQL::ExecutionError, user.lockout_message
        else
          # Calculate remaining attempts before lockout
          attempts_until_lockout = User::ATTEMPTS_PER_LOCKOUT - (user.failed_attempts % User::ATTEMPTS_PER_LOCKOUT)

          if attempts_until_lockout <= 2
            raise GraphQL::ExecutionError, "Invalid username or password. #{attempts_until_lockout} attempt#{'s' if attempts_until_lockout > 1} remaining before account lockout."
          else
            raise GraphQL::ExecutionError, 'Invalid username or password'
          end
        end
      end
    end
  end
end
