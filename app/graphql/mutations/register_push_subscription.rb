# frozen_string_literal: true

module Mutations
  class RegisterPushSubscription < BaseMutation
    description 'Registers or updates a browser push subscription for the current user'

    argument :endpoint, String, required: true
    argument :p256dh, String, required: true
    argument :auth, String, required: true
    argument :expiration_time, GraphQL::Types::ISO8601DateTime, required: false

    field :success, Boolean, null: false

    def resolve(endpoint:, p256dh:, auth:, expiration_time: nil)
      user = context[:current_user]
      raise GraphQL::ExecutionError, 'Unauthorized: Please log in' unless user

      subscription = ::PushSubscription.find_or_initialize_by(endpoint: endpoint)
      subscription.assign_attributes(
        user: user,
        p256dh_key: p256dh,
        auth_key: auth,
        expiration_time: expiration_time
      )

      unless subscription.save
        raise GraphQL::ExecutionError.new(
          'Error registering push subscription',
          extensions: subscription.errors.to_hash
        )
      end

      { success: true }
    end
  end
end
