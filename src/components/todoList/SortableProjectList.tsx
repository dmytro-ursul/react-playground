import React, { useState } from 'react';
import Project from './Project';
import { useUpdateProjectPositionMutation } from './services/apiSlice';
import './DragDrop.css';

interface ProjectProps {
  id: number;
  name: string;
  position: number;
  tasks?: {
    id: number;
    name: string;
    projectId: number;
    completed: boolean;
    position: number;
  }[];
}

interface SortableProjectListProps {
  projects: ProjectProps[];
}

const SortableProjectList: React.FC<SortableProjectListProps> = ({ projects }) => {
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [dropTargetId, setDropTargetId] = useState<number | null>(null);
  const [updateProjectPosition] = useUpdateProjectPositionMutation();
  
  // Sort projects by position
  const sortedProjects = [...projects].sort((a, b) => a.position - b.position);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    setDraggingId(id);
    e.dataTransfer.setData('text/plain', id.toString());
    // Add a custom class to the dragged element for styling
    e.currentTarget.classList.add('dragging');
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('dragging');
    setDraggingId(null);
    setDropTargetId(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDropTargetId(id);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetId: number) => {
    e.preventDefault();
    const sourceId = parseInt(e.dataTransfer.getData('text/plain'), 10);
    
    if (sourceId === targetId) return;
    
    const sourceIndex = sortedProjects.findIndex(p => p.id === sourceId);
    const targetIndex = sortedProjects.findIndex(p => p.id === targetId);
    
    if (sourceIndex === -1 || targetIndex === -1) return;
    
    // Calculate new position
    let newPosition: number;
    
    if (targetIndex === 0) {
      // Moving to the first position
      newPosition = sortedProjects[0].position / 2;
    } else if (targetIndex === sortedProjects.length - 1) {
      // Moving to the last position
      newPosition = sortedProjects[targetIndex].position + 1;
    } else if (sourceIndex < targetIndex) {
      // Moving down
      newPosition = (sortedProjects[targetIndex].position + sortedProjects[targetIndex + 1].position) / 2;
    } else {
      // Moving up
      newPosition = (sortedProjects[targetIndex - 1].position + sortedProjects[targetIndex].position) / 2;
    }
    
    // Update the position in the backend
    updateProjectPosition({ id: sourceId.toString(), position: newPosition });
  };

  return (
    <div id="project-list">
      {sortedProjects.map((project) => (
        <div
          key={project.id}
          draggable
          onDragStart={(e) => handleDragStart(e, project.id)}
          onDragEnd={handleDragEnd}
          onDragOver={(e) => handleDragOver(e, project.id)}
          onDrop={(e) => handleDrop(e, project.id)}
          className={`project-container ${draggingId === project.id ? 'dragging' : ''} ${dropTargetId === project.id ? 'drop-target' : ''}`}
        >
          <div className="drag-handle">&#9776;</div>
          <Project 
            id={project.id} 
            name={project.name} 
            tasks={project.tasks} 
            position={project.position}
          />
        </div>
      ))}
    </div>
  );
};

export default SortableProjectList;