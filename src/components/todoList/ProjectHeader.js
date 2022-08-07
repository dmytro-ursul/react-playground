/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { removeProject, updateProject } from './actions';

class ProjectHeader extends Component {
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
    const { id, updateProject } = this.props;
    const { name } = this.state;
    updateProject(id, name);
    this.setState({ isEditing: false });
  }

  editProject = () => {
    const { name } = this.state;
    this.setState({ isEditing: true, oldName: name });
  }

  handleKeyDown = (e) => {
    const { oldName } = this.state;
    if (e.key === 'Escape') this.setState({ isEditing: false, name: oldName });
  }

  render() {
    const { id, removeProject } = this.props;
    const { name, isEditing } = this.state;

    return (
      <div className="project-header">
        { isEditing
          ? (
            <form onSubmit={this.onSubmit}>
              <input
                className="editProject"
                autoFocus
                value={name}
                onKeyDown={this.handleKeyDown}
                onChange={this.onChange}
              />
            </form>
          )
          : (
            <p className="project-name" onClick={this.editProject}>
              { name }
            </p>
          )}
        <button
          className="btn-close"
          type="button"
          aria-label="Delete project"
          onClick={() => removeProject(id)}
        />
      </div>
    );
  }
}

ProjectHeader.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  updateProject: PropTypes.func.isRequired,
  removeProject: PropTypes.func.isRequired,
};

export default connect(
  null,
  { removeProject, updateProject },
)(ProjectHeader);
