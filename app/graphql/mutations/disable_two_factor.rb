# frozen_string_literal: true

module Mutations
  class DisableTwoFactor < BaseMutation
    description 'Disable 2FA (requires password confirmation)'

    argument :password, String, required: true
    argument :code, String, required: true

    field :success, Boolean, null: false
    field :message, String, null: false

    def resolve(password:, code:)
      user = context[:current_user]
      raise GraphQL::ExecutionError, 'Unauthorized' unless user

      unless user.otp_enabled?
        raise GraphQL::ExecutionError, '2FA is not enabled'
      end

      # Verify password
      unless user.authenticate(password)
        raise GraphQL::ExecutionError, 'Invalid password'
      end

      # Verify OTP code
      unless user.verify_otp(code)
        raise GraphQL::ExecutionError, 'Invalid verification code'
      end

      user.disable_otp!
      { success: true, message: '2FA has been disabled' }
    end
  end
end
