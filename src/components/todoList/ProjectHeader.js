import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    this.props.updateProject(this.props.id, this.state.name);
    this.setState({ isEditing: false });
  }

  editProject = () => {
    this.setState({ isEditing: true, oldName: this.state.name });
  }

  handleKeyDown = (e) => {
    if (e.key === 'Escape') this.setState({ isEditing: false, name: this.state.oldName });
  }

  render() {
    const { id, removeProject } = this.props;

    return (
      <div className="project-header">
        { this.state.isEditing
	      ? (
  <form onSubmit={this.onSubmit}>
    <input
      className="editProject"
      autoFocus
      value={this.state.name}
      onKeyDown={this.handleKeyDown}
      onChange={this.onChange}
    />
  </form>
          )
	      : (
  <p className="project-name" onClick={this.editProject}>
    { this.state.name }
    <span className="remove-item" onClick={() => removeProject(id)}>
		    x
    </span>
  </p>
          )}
      </div>
    );
  }
}

export default connect(
  null,
  { removeProject, updateProject },
)(ProjectHeader);
