# frozen_string_literal: true

module Mutations
  class UnregisterPushSubscription < BaseMutation
    description 'Removes a browser push subscription for the current user'

    argument :endpoint, String, required: true

    field :success, Boolean, null: false

    def resolve(endpoint:)
      user = context[:current_user]
      raise GraphQL::ExecutionError, 'Unauthorized: Please log in' unless user

      user.push_subscriptions.where(endpoint: endpoint).destroy_all

      { success: true }
    end
  end
end
