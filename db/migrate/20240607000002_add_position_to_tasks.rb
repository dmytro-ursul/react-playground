class AddPositionToTasks < ActiveRecord::Migration[7.1]
  def change
    add_column :tasks, :position, :integer
    add_index :tasks, [:project_id, :position]
    
    # Set initial positions for existing tasks within each project
    Task.reset_column_information
    Project.find_each do |project|
      project.tasks.order(:created_at).each_with_index do |task, index|
        task.update_column(:position, index)
      end
    end
  end
end