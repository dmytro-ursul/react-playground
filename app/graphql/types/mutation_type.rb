# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :sign_in, mutation: Mutations::Login
    field :change_password, mutation: Mutations::ChangePassword

    # 2FA mutations
    field :setup_two_factor, mutation: Mutations::SetupTwoFactor
    field :enable_two_factor, mutation: Mutations::EnableTwoFactor
    field :disable_two_factor, mutation: Mutations::DisableTwoFactor
    field :verify_two_factor, mutation: Mutations::VerifyTwoFactor

    field :create_project, mutation: Mutations::ProjectCreate
    field :update_project, mutation: Mutations::ProjectUpdate
    field :remove_project, mutation: Mutations::ProjectRemove
    field :update_project_position, mutation: Mutations::ProjectUpdatePosition

    field :create_task, mutation: Mutations::TaskCreate
    field :update_task, mutation: Mutations::TaskUpdate
    field :remove_task, mutation: Mutations::TaskRemove
    field :update_task_position, mutation: Mutations::TaskUpdatePosition
    field :register_push_subscription, mutation: Mutations::RegisterPushSubscription
    field :unregister_push_subscription, mutation: Mutations::UnregisterPushSubscription
    field :send_test_push_notification, mutation: Mutations::SendTestPushNotification
    field :logout, mutation: Mutations::Logout
    field :logout_all, mutation: Mutations::LogoutAll
    field :revoke_session, mutation: Mutations::RevokeSession
  end
end
