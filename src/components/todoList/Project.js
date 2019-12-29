import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectHeader from './ProjectHeader.js';
import TaskForm from './TaskForm.js';
import Task from './Task.js';

class Project extends Component {
  render() {
    const { id, name, items } = this.props;

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
}

const mapStateToProps = (state, ownProps) => ({
  items: state.tasks.filter((task) => task.projectId === ownProps.id),
});

export default connect(
  mapStateToProps,
  null,
)(Project);
