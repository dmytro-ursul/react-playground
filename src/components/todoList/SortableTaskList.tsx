import React, { useState } from 'react';
import Task from './Task';
import { useUpdateTaskPositionMutation } from './services/apiSlice';
import './DragDrop.css';

interface TaskProps {
  id: number;
  name: string;
  projectId: number;
  completed: boolean;
  position: number;
}

interface SortableTaskListProps {
  tasks: TaskProps[];
  projectId: number;
}

const SortableTaskList: React.FC<SortableTaskListProps> = ({ tasks, projectId }) => {
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [dropTargetId, setDropTargetId] = useState<number | null>(null);
  const [updateTaskPosition] = useUpdateTaskPositionMutation();
  
  // Sort tasks by position
  const sortedTasks = [...tasks].sort((a, b) => a.position - b.position);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    setDraggingId(id);
    e.dataTransfer.setData('text/plain', id.toString());
    // Add a custom class to the dragged element for styling
    e.currentTarget.classList.add('dragging');
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('dragging');
    setDraggingId(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetId: number) => {
    e.preventDefault();
    const sourceId = parseInt(e.dataTransfer.getData('text/plain'), 10);
    
    if (sourceId === targetId) return;
    
    const sourceIndex = sortedTasks.findIndex(t => t.id === sourceId);
    const targetIndex = sortedTasks.findIndex(t => t.id === targetId);
    
    if (sourceIndex === -1 || targetIndex === -1) return;
    
    // Calculate new position
    let newPosition: number;
    
    if (targetIndex === 0) {
      // Moving to the first position
      newPosition = sortedTasks[0].position / 2;
    } else if (targetIndex === sortedTasks.length - 1) {
      // Moving to the last position
      newPosition = sortedTasks[targetIndex].position + 1;
    } else if (sourceIndex < targetIndex) {
      // Moving down
      newPosition = (sortedTasks[targetIndex].position + sortedTasks[targetIndex + 1].position) / 2;
    } else {
      // Moving up
      newPosition = (sortedTasks[targetIndex - 1].position + sortedTasks[targetIndex].position) / 2;
    }
    
    // Update the position in the backend
    updateTaskPosition({ id: sourceId.toString(), position: newPosition });
  };

  return (
    <div className="task-list">
      {sortedTasks.map((task) => (
        <div
          key={task.id}
          draggable
          onDragStart={(e) => handleDragStart(e, task.id)}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, task.id)}
          className={`task-container ${draggingId === task.id ? 'dragging' : ''}`}
        >
          <div className="drag-handle">&#9776;</div>
          <Task 
            id={task.id} 
            name={task.name} 
            completed={task.completed} 
            projectId={projectId}
          />
        </div>
      ))}
    </div>
  );
};

export default SortableTaskList;