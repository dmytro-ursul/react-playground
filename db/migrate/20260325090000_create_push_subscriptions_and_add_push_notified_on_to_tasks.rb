# frozen_string_literal: true

class CreatePushSubscriptionsAndAddPushNotifiedOnToTasks < ActiveRecord::Migration[7.1]
  def change
    create_table :push_subscriptions do |t|
      t.references :user, null: false, foreign_key: true
      t.text :endpoint, null: false
      t.string :p256dh_key, null: false
      t.string :auth_key, null: false
      t.datetime :expiration_time

      t.timestamps
    end

    add_index :push_subscriptions, :endpoint, unique: true
    add_column :tasks, :push_notified_on, :date
    add_index :tasks, :push_notified_on
  end
end
