# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PushNotifications::BroadcastToUser do
  let(:user) do
    User.create!(
      email: 'broadcast@example.com',
      username: 'broadcast-user',
      first_name: 'Broadcast',
      last_name: 'User',
      password: 'Password1!'
    )
  end

  let!(:subscription_one) do
    PushSubscription.create!(
      user: user,
      endpoint: 'https://push.example.test/subscriptions/a',
      p256dh_key: 'p256dh-key-a',
      auth_key: 'auth-key-a'
    )
  end

  let!(:subscription_two) do
    PushSubscription.create!(
      user: user,
      endpoint: 'https://push.example.test/subscriptions/b',
      p256dh_key: 'p256dh-key-b',
      auth_key: 'auth-key-b'
    )
  end

  it 'delivers to all subscriptions of a user' do
    allow(PushNotifications::Delivery).to receive(:call).and_return(true)

    result = described_class.call(user: user, title: 'Hello', body: 'World')

    expect(result).to be(true)
    expect(PushNotifications::Delivery).to have_received(:call).twice
  end

  it 'returns true when at least one delivery succeeds' do
    allow(PushNotifications::Delivery).to receive(:call).and_return(false, true)

    result = described_class.call(user: user, title: 'Hello', body: 'World')

    expect(result).to be(true)
  end

  it 'returns false when all deliveries fail' do
    allow(PushNotifications::Delivery).to receive(:call).and_return(false)

    result = described_class.call(user: user, title: 'Hello', body: 'World')

    expect(result).to be(false)
  end

  it 'returns false when user has no subscriptions' do
    PushSubscription.delete_all

    result = described_class.call(user: user, title: 'Hello', body: 'World')

    expect(result).to be(false)
  end
end
