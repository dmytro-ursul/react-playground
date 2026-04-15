# frozen_string_literal: true

module Types
  class SessionType < Types::BaseObject
    field :id, ID, null: false
    field :ip_address, String, null: true
    field :user_agent, String, null: true
    field :last_active_at, GraphQL::Types::ISO8601DateTime, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :current, Boolean, null: false

    def current
      object.id == context[:current_session]&.id
    end
  end
end
