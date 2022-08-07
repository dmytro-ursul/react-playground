import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { addTask } from './actions';

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { name } = this.state;
    const { projectId } = this.props;

    /* eslint no-shadow: ["error", { "allow": ["addTask"] }] */
    const { addTask } = this.props;

    addTask(name, projectId);
    this.setState({ name: '' });
  }

  onChange = (event) => {
    this.setState({ name: event.target.value });
  }

  render() {
    const { name } = this.state;
    return (
      <form className="task-form" onSubmit={this.handleSubmit}>
        <div className="input-group-sm flex">
          <input
            type="text"
            className="text-enter"
            value={name}
            onChange={this.onChange}
            placeholder="Please enter task name"
          />
          <input className="task-add btn btn-primary" type="button" value="add task" onClick={this.handleSubmit} />
        </div>
      </form>
    );
  }
}

TaskForm.propTypes = {
  projectId: PropTypes.string.isRequired,
  addTask: PropTypes.func.isRequired,
};

export default connect(
  null,
  { addTask },
)(TaskForm);
