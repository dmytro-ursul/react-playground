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
class PushSubscription < ApplicationRecord
  belongs_to :user

  validates :endpoint, presence: true, uniqueness: true
  validates :p256dh_key, presence: true
  validates :auth_key, presence: true

  scope :expired, -> { where.not(expiration_time: nil).where(expiration_time: ...Time.current) }
end
