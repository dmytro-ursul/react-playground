# frozen_string_literal: true

# == Schema Information
#
# Table name: projects
#
#  id         :bigint           not null, primary key
#  deleted_at :datetime
#  name       :string
#  position   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint
#
# Indexes
#
#  index_projects_on_deleted_at  (deleted_at)
#  index_projects_on_name        (name)
#  index_projects_on_position    (position)
#  index_projects_on_user_id     (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
require 'rails_helper'

RSpec.describe Project, type: :model do
  def create_user
    User.create!(email: 'owner@example.com', username: 'owner', password: 'Strong1!')
  end

  it 'is valid with a name and user' do
    user = create_user
    project = user.projects.build(name: 'Project Alpha')
    expect(project).to be_valid
  end

  it 'requires a name' do
    user = create_user
    project = user.projects.build(name: nil)
    expect(project).not_to be_valid
  end

  it 'assigns position on create' do
    user = create_user
    first = user.projects.create!(name: 'First')
    second = user.projects.create!(name: 'Second')

    expect(first.position).to eq(1)
    expect(second.position).to eq(2)
  end

  it 'moves a project to a new position and shifts others' do
    user = create_user
    first = user.projects.create!(name: 'First')
    second = user.projects.create!(name: 'Second')
    third = user.projects.create!(name: 'Third')

    third.move_to_position(1)

    expect(first.reload.position).to eq(2)
    expect(second.reload.position).to eq(3)
    expect(third.reload.position).to eq(1)
  end
end
