import React from 'react';
import { connect } from 'react-redux';
import ProjectHeader from './ProjectHeader';
import TaskForm from './TaskForm';
import Task from './Task';

interface RootState {
  tasks: {
    id: number;
    name: string;
    projectId: number;
  }[];
}
interface OwnProps {
  id: number;
  name: string;
  items?: {
    id: number;
    name: string;
  }[];
}

function Project({ id, name, items = [] }: OwnProps): JSX.Element {
  return (
    <div className="project">
      <ProjectHeader name={name} id={id} />
      <TaskForm projectId={id} />
      <div className="task-list">
        {items.map((task) => (
          <Task name={task.name} id={task.id} key={task.id} />
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => ({
  items: state.tasks.filter((task: { projectId: number; }) => task.projectId === ownProps.id),
});

export default connect(mapStateToProps)(Project);
