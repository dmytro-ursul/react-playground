# frozen_string_literal: true

# == Schema Information
#
# Table name: push_subscriptions
#
#  id              :bigint           not null, primary key
#  auth_key        :string           not null
#  endpoint        :text             not null
#  expiration_time :datetime
#  p256dh_key      :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  user_id         :bigint           not null
#
# Indexes
#
#  index_push_subscriptions_on_endpoint  (endpoint) UNIQUE
#  index_push_subscriptions_on_user_id   (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
require 'rails_helper'

RSpec.describe PushSubscription, type: :model do
  let(:user) do
    User.create!(
      email: 'push@example.com',
      username: 'push-user',
      first_name: 'Push',
      last_name: 'User',
      password: 'Password1!'
    )
  end

  it 'is valid with endpoint and keys' do
    subscription = described_class.new(
      user: user,
      endpoint: 'https://push.example.test/subscriptions/1',
      p256dh_key: 'p256dh-key',
      auth_key: 'auth-key'
    )

    expect(subscription).to be_valid
  end

  it 'requires a unique endpoint' do
    described_class.create!(
      user: user,
      endpoint: 'https://push.example.test/subscriptions/1',
      p256dh_key: 'p256dh-key',
      auth_key: 'auth-key'
    )

    duplicate = described_class.new(
      user: user,
      endpoint: 'https://push.example.test/subscriptions/1',
      p256dh_key: 'different-key',
      auth_key: 'different-auth'
    )

    expect(duplicate).not_to be_valid
    expect(duplicate.errors[:endpoint]).to include('has already been taken')
  end
end
