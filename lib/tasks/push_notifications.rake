# frozen_string_literal: true

namespace :push_notifications do
  desc 'Send due-today task reminders via Web Push'
  task send_due_task_reminders: :environment do
    PushNotifications::Cleanup.call
    PushNotifications::DueTaskReminder.call
  end

  desc 'Remove expired push subscriptions'
  task cleanup: :environment do
    PushNotifications::Cleanup.call
  end
end
