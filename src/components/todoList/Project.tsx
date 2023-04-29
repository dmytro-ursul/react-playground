import React from 'react';
import ProjectHeader from './ProjectHeader';
import TaskForm from './TaskForm';
import Task from './Task';

interface ProjectProps {
  id: number;
  name: string;
  tasks?: {
    id: number;
    name: string;
    projectId: number;
    completed: boolean;
  }[];
}

export default function Project({ id, name, tasks = [] }: ProjectProps): JSX.Element {
  return (
    <div className="project">
      <ProjectHeader name={name} id={id} />
      <TaskForm projectId={id} />
      <div className="task-list">
        {tasks.map((task) => (
          <Task id={task.id} key={task.id} name={task.name} completed={task.completed} projectId={id} />
        ))}
      </div>
    </div>
  );
}
