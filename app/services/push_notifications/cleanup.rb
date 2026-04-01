# frozen_string_literal: true

module PushNotifications
  class Cleanup
    class << self
      def call
        count = PushSubscription.expired.delete_all
        Rails.logger.info("[PushNotifications::Cleanup] Removed #{count} expired subscription(s)") if count.positive?
        count
      end
    end
  end
end
