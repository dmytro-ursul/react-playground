/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { addProject } from './actions';

class NewProjectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  onChange = (event) => {
    this.setState({ name: event.target.value });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { addProject } = this.props;
    const { name } = this.state;
    addProject(name);
    this.setState({ name: '' });
  }

  render() {
    const { name } = this.state;
    return (
      <form onSubmit={this.onSubmit} id="new-project-form">
        <input
          autoFocus
          value={name}
          onChange={this.onChange}
        />
        <button type="button">add project</button>
      </form>
    );
  }
}

NewProjectForm.propTypes = {
  addProject: PropTypes.func.isRequired,
};

export default connect(
  null,
  { addProject },
)(NewProjectForm);
