# frozen_string_literal: true

module Mutations
  class SendTestPushNotification < BaseMutation
    description 'Sends a test push notification to the current user devices'

    field :success, Boolean, null: false

    def resolve
      user = context[:current_user]
      raise GraphQL::ExecutionError, 'Unauthorized: Please log in' unless user

      delivered = PushNotifications::BroadcastToUser.call(
        user: user,
        title: 'Push notifications enabled',
        body: 'This device can receive task reminders even when the app is closed.',
        tag: 'push-enabled',
        url: '/',
        require_interaction: false
      )

      { success: delivered }
    end
  end
end
