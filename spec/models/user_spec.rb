# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string
#  failed_attempts :integer          default(0), not null
#  first_name      :string           default(""), not null
#  last_name       :string           default(""), not null
#  locked_until    :datetime
#  name            :string
#  otp_enabled     :boolean          default(FALSE), not null
#  otp_secret      :string
#  password_digest :string
#  username        :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
require 'rails_helper'

RSpec.describe User, type: :model do
  def build_user(overrides = {})
    defaults = {
      email: 'user@example.com',
      username: 'testuser',
      password: 'Strong1!'
    }
    User.new(defaults.merge(overrides))
  end

  it 'is valid with required attributes' do
    expect(build_user).to be_valid
  end

  it 'requires an email' do
    user = build_user(email: nil)
    expect(user).not_to be_valid
  end

  it 'requires a username' do
    user = build_user(username: nil)
    expect(user).not_to be_valid
  end

  it 'enforces unique email and username' do
    build_user.save!
    duplicate = build_user
    expect(duplicate).not_to be_valid
  end

  it 'validates strong passwords' do
    user = build_user(password: 'weakpass1')
    expect(user).not_to be_valid

    user.password = 'Stronger1!'
    expect(user).to be_valid
  end

  it 'does not require password on update if password is not being changed' do
    user = build_user
    user.save!

    user.password = nil
    expect(user).to be_valid
  end

  it 'locks the account after the configured number of failed attempts' do
    user = build_user
    user.save!
    user.update!(failed_attempts: User::ATTEMPTS_PER_LOCKOUT - 1)

    travel_to(Time.current) do
      user.record_failed_attempt!
      expect(user.failed_attempts).to eq(User::ATTEMPTS_PER_LOCKOUT)
      expect(user.locked?).to be(true)
      expect(user.lockout_time_remaining).to be > 0
    end
  end
end
