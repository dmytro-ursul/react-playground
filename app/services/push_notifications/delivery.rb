# frozen_string_literal: true

require 'web_push'

module PushNotifications
  class Delivery
    class << self
      def call(subscription:, title:, body:, tag: nil, url: '/', require_interaction: false)
        return false unless Config.configured?

        WebPush.payload_send(
          endpoint: subscription.endpoint,
          p256dh: subscription.p256dh_key,
          auth: subscription.auth_key,
          message: payload(title:, body:, tag:, url:, require_interaction:),
          vapid: {
            subject: Config.subject,
            public_key: Config.public_key,
            private_key: Config.private_key
          }
        )

        true
      rescue StandardError => e
        cleanup_stale_subscription(subscription, e)
        Rails.logger.error("[PushNotifications::Delivery] #{e.class}: #{e.message}")
        false
      end

      private

      def payload(title:, body:, tag:, url:, require_interaction:)
        JSON.generate(
          title: title,
          options: {
            body: body,
            icon: '/logo192.png',
            badge: '/favicon.ico',
            tag: tag,
            requireInteraction: require_interaction,
            data: { url: url }
          }.compact
        )
      end

      def cleanup_stale_subscription(subscription, error)
        return unless error.message.match?(/\b(404|410)\b|expired subscription/i)

        subscription.delete
      end
    end
  end
end
