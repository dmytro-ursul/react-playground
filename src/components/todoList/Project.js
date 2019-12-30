import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import ProjectHeader from './ProjectHeader';
import TaskForm from './TaskForm';
import Task from './Task';

function Project(props) {
  const { id, name, items } = props;

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

Project.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};


const mapStateToProps = (state, ownProps) => ({
  items: state.tasks.filter((task) => task.projectId === ownProps.id),
});

export default connect(
  mapStateToProps,
  null,
)(Project);
