# frozen_string_literal: true

# == Schema Information
#
# Table name: projects
#
#  id         :bigint           not null, primary key
#  name       :string
#  position   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint
#
# Indexes
#
#  index_projects_on_name      (name)
#  index_projects_on_position  (position)
#  index_projects_on_user_id   (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Project < ApplicationRecord
  has_many :tasks, -> { order(:position) }, dependent: :destroy
  belongs_to :user

  validates :name, presence: true

  before_create :set_position
  
  scope :ordered, -> { order(:position) }



  def set_position
    self.position = user.projects.maximum(:position).to_i + 1
  end

  def move_to_position(new_position)
    old_position = position
    return if old_position == new_position

    transaction do
      if new_position < old_position
        user.projects.where(position: new_position...old_position)
                     .update_all('position = position + 1')
      else
        user.projects.where(position: (old_position + 1)..new_position)
                     .update_all('position = position - 1')
      end
      update!(position: new_position)
    end
  end
end
