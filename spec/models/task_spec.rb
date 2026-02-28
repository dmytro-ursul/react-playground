# frozen_string_literal: true

# == Schema Information
#
# Table name: tasks
#
#  id         :bigint           not null, primary key
#  completed  :boolean
#  deleted_at :datetime
#  due_date   :date
#  name       :string
#  position   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  project_id :bigint           not null
#
# Indexes
#
#  index_tasks_on_deleted_at               (deleted_at)
#  index_tasks_on_name                     (name)
#  index_tasks_on_project_id               (project_id)
#  index_tasks_on_project_id_and_position  (project_id,position)
#
# Foreign Keys
#
#  fk_rails_...  (project_id => projects.id)
#
require 'rails_helper'

RSpec.describe Task, type: :model do
  def create_project
    user = User.create!(email: 'tasker@example.com', username: 'tasker', password: 'Strong1!')
    user.projects.create!(name: 'Project')
  end

  it 'is valid with a name, completed flag, and project' do
    project = create_project
    task = project.tasks.build(name: 'Task 1', completed: false)
    expect(task).to be_valid
  end

  it 'requires a name' do
    project = create_project
    task = project.tasks.build(name: nil, completed: false)
    expect(task).not_to be_valid
  end

  it 'requires completed to be true or false' do
    project = create_project
    task = project.tasks.build(name: 'Task 1', completed: nil)
    expect(task).not_to be_valid
  end

  it 'assigns position on create' do
    project = create_project
    first = project.tasks.create!(name: 'First', completed: false)
    second = project.tasks.create!(name: 'Second', completed: false)

    expect(first.position).to eq(1)
    expect(second.position).to eq(2)
  end

  it 'moves a task to a new position and shifts others' do
    project = create_project
    first = project.tasks.create!(name: 'First', completed: false)
    second = project.tasks.create!(name: 'Second', completed: false)
    third = project.tasks.create!(name: 'Third', completed: false)

    third.move_to_position(1)

    expect(first.reload.position).to eq(2)
    expect(second.reload.position).to eq(3)
    expect(third.reload.position).to eq(1)
  end
end
