# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PushNotifications::Delivery do
  let(:user) do
    User.create!(
      email: 'delivery@example.com',
      username: 'delivery-user',
      first_name: 'Delivery',
      last_name: 'User',
      password: 'Password1!'
    )
  end

  let(:subscription) do
    PushSubscription.create!(
      user: user,
      endpoint: 'https://push.example.test/subscriptions/2',
      p256dh_key: 'p256dh-key',
      auth_key: 'auth-key'
    )
  end

  before do
    allow(PushNotifications::Config).to receive(:configured?).and_return(true)
    allow(PushNotifications::Config).to receive(:subject).and_return('mailto:test@example.com')
    allow(PushNotifications::Config).to receive(:public_key).and_return('public-key')
    allow(PushNotifications::Config).to receive(:private_key).and_return('private-key')
  end

  it 'sends a web push payload with vapid credentials' do
    allow(WebPush).to receive(:payload_send)

    result = described_class.call(
      subscription: subscription,
      title: 'Title',
      body: 'Body',
      tag: 'tag-1',
      url: '/'
    )

    expect(result).to be(true)
    expect(WebPush).to have_received(:payload_send).with(
      hash_including(
        endpoint: subscription.endpoint,
        p256dh: subscription.p256dh_key,
        auth: subscription.auth_key,
        vapid: {
          subject: 'mailto:test@example.com',
          public_key: 'public-key',
          private_key: 'private-key'
        }
      )
    )
  end

  it 'removes stale subscriptions when provider marks them expired' do
    subscription

    expect do
      described_class.send(:cleanup_stale_subscription, subscription, StandardError.new('410 Gone'))
    end.to change(PushSubscription, :count).by(-1)
  end
end
