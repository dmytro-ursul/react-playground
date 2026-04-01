# frozen_string_literal: true

module Types
  class PushNotificationConfigType < Types::BaseObject
    field :public_key, String, null: false
  end
end
