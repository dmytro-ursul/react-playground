# frozen_string_literal: true

module PushNotifications
  class DueTaskReminder
    class << self
      def call(date: Date.current)
        due_tasks(date).find_each do |task|
          delivered = BroadcastToUser.call(
            user: task.project.user,
            title: "Task Due Today: #{task.name}",
            body: "Project: #{task.project.name}",
            tag: "task-due-#{task.id}-#{date}",
            url: '/',
            require_interaction: false
          )

          task.update_column(:push_notified_on, date) if delivered
        end
      end

      private

      def due_tasks(date)
        Task.visible
            .joins(:project)
            .merge(Project.visible)
            .includes(project: :user)
            .where(completed: false, due_date: date)
            .where('tasks.push_notified_on IS NULL OR tasks.push_notified_on < ?', date)
      end
    end
  end
end
