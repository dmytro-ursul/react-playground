# frozen_string_literal: true

return unless defined?(Rails::Server) || ENV['ENABLE_SCHEDULER'] == 'true'

require 'rufus-scheduler'

scheduler = Rufus::Scheduler.new

scheduler.cron '0 10 * * * Europe/Kyiv' do
  Rails.logger.info('[Scheduler] Running push notification reminders…')
  PushNotifications::Cleanup.call
  PushNotifications::DueTaskReminder.call
rescue StandardError => e
  Rails.logger.error("[Scheduler] Push notification reminder failed: #{e.class}: #{e.message}")
end

Rails.logger.info('[Scheduler] Push notification reminders scheduled for 10:00 EET/EEST daily')
