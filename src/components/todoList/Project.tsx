import React from 'react';
import { connect } from 'react-redux';
import ProjectHeader from './ProjectHeader';
import TaskForm from './TaskForm';
import Task from './Task';

interface ProjectProps {
  id: number;
  name: string;
  tasks?: {
    id: number;
    name: string;
  }[];
}

export default function Project({ id, name, tasks = [] }: ProjectProps): JSX.Element {
  return (
    <div className="project">
      <ProjectHeader name={name} id={id} />
      <TaskForm projectId={id} />
      <div className="task-list">
        {tasks.map((task) => (
          <Task name={task.name} id={task.id} key={task.id} />
        ))}
      </div>
    </div>
  );
}
