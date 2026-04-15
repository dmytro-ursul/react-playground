class CreateSessions < ActiveRecord::Migration[7.1]
  def change
    create_table :sessions do |t|
      t.references :user, null: false, foreign_key: true
      t.string :ip_address
      t.string :user_agent
      t.datetime :last_active_at, null: false
      t.datetime :revoked_at

      t.timestamps
    end

    add_index :sessions, [:user_id, :revoked_at]
  end
end
