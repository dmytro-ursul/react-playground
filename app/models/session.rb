# frozen_string_literal: true

class Session < ApplicationRecord
  belongs_to :user

  scope :active, -> { where(revoked_at: nil) }

  def revoke!
    update!(revoked_at: Time.current)
  end

  def active?
    revoked_at.nil?
  end

  def touch_last_active!
    update_column(:last_active_at, Time.current)
  end
end
