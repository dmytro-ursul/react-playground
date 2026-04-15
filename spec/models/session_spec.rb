# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Session, type: :model do
  let(:user) do
    User.create!(
      email: 'session@example.com',
      username: 'session-user',
      first_name: 'Session',
      last_name: 'User',
      password: 'Password1!'
    )
  end

  def create_session(overrides = {})
    defaults = {
      user: user,
      ip_address: '127.0.0.1',
      user_agent: 'Mozilla/5.0 Test',
      last_active_at: Time.current
    }
    Session.create!(defaults.merge(overrides))
  end

  describe 'associations' do
    it 'belongs to a user' do
      session = create_session
      expect(session.user).to eq(user)
    end

    it 'is destroyed when user is destroyed' do
      create_session
      expect { user.destroy }.to change(Session, :count).by(-1)
    end
  end

  describe '#active?' do
    it 'returns true when revoked_at is nil' do
      session = create_session
      expect(session).to be_active
    end

    it 'returns false when revoked_at is set' do
      session = create_session
      session.revoke!
      expect(session).not_to be_active
    end
  end

  describe '#revoke!' do
    it 'sets revoked_at to current time' do
      session = create_session

      freeze_time do
        session.revoke!
        expect(session.revoked_at).to eq(Time.current)
      end
    end
  end

  describe '#touch_last_active!' do
    it 'updates last_active_at without changing updated_at' do
      session = create_session(last_active_at: 1.hour.ago)
      original_updated_at = session.updated_at

      freeze_time do
        session.touch_last_active!
        expect(session.reload.last_active_at).to eq(Time.current)
        expect(session.updated_at).to eq(original_updated_at)
      end
    end
  end

  describe '.active scope' do
    it 'returns only sessions without revoked_at' do
      active = create_session
      revoked = create_session
      revoked.revoke!

      expect(Session.active).to contain_exactly(active)
    end
  end
end
