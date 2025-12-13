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
#  password_digest :string
#  username        :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_secure_password

  has_many :projects, dependent: :destroy

  validates :email, presence: true, uniqueness: true
  validates :username, presence: true, uniqueness: true

  # Strong password validation
  validates :password,
    presence: true,
    length: { minimum: 8 },
    format: {
      with: /\A(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_\-.\+=])[A-Za-z\d@$!%*?&_\-.\+=]+\z/,
      message: 'must include at least one lowercase letter, one uppercase letter, one digit, and one special character (@$!%*?&_-.+=)'
    },
    if: :password_required?

  # Brute force protection constants
  ATTEMPTS_PER_LOCKOUT = 5
  BASE_LOCKOUT_MINUTES = 10
  MAX_LOCKOUT_MINUTES = 300 # 5 hours

  # Check if account is currently locked
  def locked?
    locked_until.present? && locked_until > Time.current
  end

  # Get remaining lockout time in seconds
  def lockout_time_remaining
    return 0 unless locked?
    (locked_until - Time.current).to_i
  end

  # Record a failed login attempt
  def record_failed_attempt!
    increment!(:failed_attempts)

    # Lock account if reached threshold
    if failed_attempts % ATTEMPTS_PER_LOCKOUT == 0
      lock_account!
    end
  end

  # Lock the account with exponential backoff
  def lock_account!
    lockout_number = failed_attempts / ATTEMPTS_PER_LOCKOUT
    lockout_minutes = [BASE_LOCKOUT_MINUTES * (2 ** (lockout_number - 1)), MAX_LOCKOUT_MINUTES].min

    update!(locked_until: Time.current + lockout_minutes.minutes)
  end

  # Reset failed attempts after successful login
  def reset_failed_attempts!
    update!(failed_attempts: 0, locked_until: nil)
  end

  # Get lockout message with time remaining
  def lockout_message
    return nil unless locked?

    remaining = lockout_time_remaining
    if remaining >= 3600
      hours = (remaining / 3600.0).ceil
      "Account is locked. Please try again in #{hours} hour#{'s' if hours > 1}."
    elsif remaining >= 60
      minutes = (remaining / 60.0).ceil
      "Account is locked. Please try again in #{minutes} minute#{'s' if minutes > 1}."
    else
      "Account is locked. Please try again in #{remaining} second#{'s' if remaining > 1}."
    end
  end

  private

  def password_required?
    password_digest.nil? || password.present?
  end
end
