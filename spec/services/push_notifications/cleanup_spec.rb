# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PushNotifications::Cleanup do
  let(:user) do
    User.create!(
      email: 'cleanup@example.com',
      username: 'cleanup-user',
      first_name: 'Cleanup',
      last_name: 'User',
      password: 'Password1!'
    )
  end

  it 'removes subscriptions past their expiration_time' do
    PushSubscription.create!(
      user: user,
      endpoint: 'https://push.example.test/expired',
      p256dh_key: 'key',
      auth_key: 'auth',
      expiration_time: 1.hour.ago
    )

    expect { described_class.call }.to change(PushSubscription, :count).by(-1)
  end

  it 'keeps subscriptions that have not expired' do
    PushSubscription.create!(
      user: user,
      endpoint: 'https://push.example.test/valid',
      p256dh_key: 'key',
      auth_key: 'auth',
      expiration_time: 1.hour.from_now
    )

    expect { described_class.call }.not_to change(PushSubscription, :count)
  end

  it 'keeps subscriptions with no expiration_time' do
    PushSubscription.create!(
      user: user,
      endpoint: 'https://push.example.test/no-expiry',
      p256dh_key: 'key',
      auth_key: 'auth',
      expiration_time: nil
    )

    expect { described_class.call }.not_to change(PushSubscription, :count)
  end

  it 'returns the count of deleted subscriptions' do
    PushSubscription.create!(
      user: user,
      endpoint: 'https://push.example.test/expired-1',
      p256dh_key: 'key',
      auth_key: 'auth',
      expiration_time: 2.hours.ago
    )
    PushSubscription.create!(
      user: user,
      endpoint: 'https://push.example.test/expired-2',
      p256dh_key: 'key',
      auth_key: 'auth',
      expiration_time: 3.hours.ago
    )

    expect(described_class.call).to eq(2)
  end
end
