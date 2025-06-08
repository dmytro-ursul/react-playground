class AddPositionToProjects < ActiveRecord::Migration[7.1]
  def change
    add_column :projects, :position, :integer
    add_index :projects, :position
    
    # Set initial positions for existing projects
    Project.reset_column_information
    Project.order(:created_at).each_with_index do |project, index|
      project.update_column(:position, index)
    end
  end
end