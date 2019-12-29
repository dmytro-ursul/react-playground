/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { removeTask, updateTask } from './actions';

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      name: props.name,
    };
  }

  onChange = (event) => {
    this.setState({ name: event.target.value });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { id, updateTask } = this.props;
    const { name } = this.state;
    updateTask(id, name);
    this.setState({ isEditing: false });
  }

  editTask = () => {
    const { name } = this.state;
    this.setState({ isEditing: true, oldName: name });
  }

  handleKeyDown = (e) => {
    const { oldName } = this.state;
    if (e.key === 'Escape') this.setState({ isEditing: false, name: oldName });
  }

  render() {
    const { id, removeTask } = this.props;
    const { isEditing, name } = this.state;
    return (
      <div>
        { isEditing ? (
          <form onSubmit={this.onSubmit}>
            <input
              className="editTask"
              autoFocus
              value={name}
              onKeyDown={this.handleKeyDown}
              onChange={this.onChange}
            />
          </form>
        )
          : <p className="task" onClick={this.editTask}>{ name }</p> }
        <span
          className="remove-item"
          role="button"
          aria-hidden
          onClick={() => removeTask(id)}
        >
x
        </span>
      </div>
    );
  }
}

Task.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  updateTask: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
};

export default connect(
  null,
  { removeTask, updateTask },
)(Task);
