# frozen_string_literal: true

class AddDeletedAtToProjectsAndTasks < ActiveRecord::Migration[7.1]
  def change
    add_column :projects, :deleted_at, :datetime
    add_column :tasks, :deleted_at, :datetime

    add_index :projects, :deleted_at
    add_index :tasks, :deleted_at
  end
end
