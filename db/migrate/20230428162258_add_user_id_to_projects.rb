class AddUserIdToProjects < ActiveRecord::Migration[7.0]
  # add user reference to projects
  def change
    add_reference :projects, :user, foreign_key: true
  end
end
