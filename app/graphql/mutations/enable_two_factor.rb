# frozen_string_literal: true

module Mutations
  class EnableTwoFactor < BaseMutation
    description 'Enable 2FA after verifying the code from authenticator app'

    argument :code, String, required: true

    field :success, Boolean, null: false
    field :message, String, null: false

    def resolve(code:)
      user = context[:current_user]
      raise GraphQL::ExecutionError, 'Unauthorized' unless user

      unless user.otp_secret.present?
        raise GraphQL::ExecutionError, 'Please setup 2FA first'
      end

      if user.otp_enabled?
        raise GraphQL::ExecutionError, '2FA is already enabled'
      end

      if user.verify_otp(code)
        user.enable_otp!
        { success: true, message: '2FA has been enabled successfully' }
      else
        raise GraphQL::ExecutionError, 'Invalid verification code. Please try again.'
      end
    end
  end
end
