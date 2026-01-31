# frozen_string_literal: true

module Mutations
  class VerifyTwoFactor < BaseMutation
    include JsonWebToken

    description 'Verify 2FA code during login'

    argument :temp_token, String, required: true
    argument :code, String, required: true

    field :token, String, null: false
    field :user, Types::UserType, null: false

    def resolve(temp_token:, code:)
      # Decode the temporary token to get user_id
      begin
        decoded = jwt_decode(temp_token)
        user_id = decoded[:user_id]
        is_temp = decoded[:temp_token]

        unless is_temp
          raise GraphQL::ExecutionError, 'Invalid token type'
        end
      rescue JWT::DecodeError, JWT::ExpiredSignature => e
        raise GraphQL::ExecutionError, 'Invalid or expired token'
      end

      user = User.find_by(id: user_id)
      raise GraphQL::ExecutionError, 'User not found' unless user

      # Verify the OTP code
      unless user.verify_otp(code)
        user.record_failed_attempt!
        
        if user.locked?
          raise GraphQL::ExecutionError, user.lockout_message
        end
        
        raise GraphQL::ExecutionError, 'Invalid verification code'
      end

      # Success - reset failed attempts and issue full token
      user.reset_failed_attempts!
      
      {
        token: jwt_encode(user_id: user.id),
        user: user
      }
    end
  end
end
