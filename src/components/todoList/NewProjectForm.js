import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    this.props.addProject(this.state.name);
    this.setState({ name: '' });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} id="new-project-form">
        <input
          autoFocus
          value={this.state.name}
          onChange={this.onChange}
        />
        <button>add project</button>
      </form>
    );
  }
}

export default connect(
  null,
  { addProject },
)(NewProjectForm);
