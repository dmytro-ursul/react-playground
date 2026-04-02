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
  let(:today) { Date.current }

  let(:due_today_task)  { Task.create!(name: 'Due Today',    project: project, completed: false, due_date: today) }
  let(:overdue_task)    { Task.create!(name: 'Overdue Task', project: project, completed: false, due_date: today - 3.days) }
  let(:future_task)     { Task.create!(name: 'Future Task',  project: project, completed: false, due_date: today + 1.day) }

  before { due_today_task; overdue_task; future_task }

  it 'marks due-today tasks as notified after a successful delivery' do
    allow(PushNotifications::BroadcastToUser).to receive(:call).and_return(true)

    described_class.call(date: today)

    expect(due_today_task.reload.push_notified_on).to eq(today)
  end

  it 'marks overdue tasks as notified after a successful delivery' do
    allow(PushNotifications::BroadcastToUser).to receive(:call).and_return(true)

    described_class.call(date: today)

    expect(overdue_task.reload.push_notified_on).to eq(today)
  end

  it 'does not notify future tasks' do
    allow(PushNotifications::BroadcastToUser).to receive(:call).and_return(true)

    described_class.call(date: today)

    expect(future_task.reload.push_notified_on).to be_nil
  end

  it 'uses "Task Due Today" title for tasks due today' do
    allow(PushNotifications::BroadcastToUser).to receive(:call).and_return(true)

    described_class.call(date: today)

    expect(PushNotifications::BroadcastToUser).to have_received(:call).with(
      hash_including(title: "Task Due Today: #{due_today_task.name}")
    )
  end

  it 'uses "Overdue Task" title for past-due tasks' do
    allow(PushNotifications::BroadcastToUser).to receive(:call).and_return(true)

    described_class.call(date: today)

    expect(PushNotifications::BroadcastToUser).to have_received(:call).with(
      hash_including(title: "Overdue Task: #{overdue_task.name}")
    )
  end

  it 'does not mark tasks when nothing was delivered' do
    allow(PushNotifications::BroadcastToUser).to receive(:call).and_return(false)

    described_class.call(date: today)

    expect(due_today_task.reload.push_notified_on).to be_nil
    expect(overdue_task.reload.push_notified_on).to be_nil
  end
end
