# frozen_string_literal: true

# == Schema Information
#
# Table name: tasks
#
#  id         :bigint           not null, primary key
#  completed  :boolean
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  project_id :bigint           not null
#
# Indexes
#
#  index_tasks_on_name        (name)
#  index_tasks_on_project_id  (project_id)
#
# Foreign Keys
#
#  fk_rails_...  (project_id => projects.id)
#
class Task < ApplicationRecord
  belongs_to :project

  validates :name, presence: true
  validates :completed, inclusion: { in: [true, false] }

  before_create :set_position
  
  scope :ordered, -> { order(:position) }

  def set_position
    self.position = project.tasks.maximum(:position).to_i + 1
  end

  def move_to_position(new_position)
    old_position = position
    return if old_position == new_position

    transaction do
      if new_position < old_position
        project.tasks.where(position: new_position...old_position)
                     .update_all('position = position + 1')
      else
        project.tasks.where(position: (old_position + 1)..new_position)
                     .update_all('position = position - 1')
      end
      update!(position: new_position)
    end
  end
end
