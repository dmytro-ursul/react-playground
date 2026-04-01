# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PushNotifications::DueTaskReminder do
  let(:user) do
    User.create!(
      email: 'reminder@example.com',
      username: 'reminder-user',
      first_name: 'Reminder',
      last_name: 'User',
      password: 'Password1!'
    )
  end

  let(:project) { Project.create!(name: 'Push Project', user: user) }
  let(:task) { Task.create!(name: 'Due Task', project: project, completed: false, due_date: Date.current) }

  before do
    task
  end

  it 'marks due tasks as notified after a successful delivery' do
    allow(PushNotifications::BroadcastToUser).to receive(:call).and_return(true)

    described_class.call(date: Date.current)

    expect(task.reload.push_notified_on).to eq(Date.current)
  end

  it 'does not mark tasks when nothing was delivered' do
    allow(PushNotifications::BroadcastToUser).to receive(:call).and_return(false)

    described_class.call(date: Date.current)

    expect(task.reload.push_notified_on).to be_nil
  end
end
