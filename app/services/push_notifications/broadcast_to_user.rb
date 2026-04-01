# frozen_string_literal: true

module PushNotifications
  class BroadcastToUser
    class << self
      def call(user:, title:, body:, tag: nil, url: '/', require_interaction: false)
        deliveries = user.push_subscriptions.find_each.filter_map do |subscription|
          Delivery.call(
            subscription: subscription,
            title: title,
            body: body,
            tag: tag,
            url: url,
            require_interaction: require_interaction
          )
        end

        deliveries.any?
      end
    end
  end
end
