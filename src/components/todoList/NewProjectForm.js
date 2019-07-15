import React, { Component } from 'react';

class NewProjectForm extends Component {
  constructor(props){
    super(props)
    this.name = '';
    this.projects = this.props.projects;
    this.projectNameInput = React.createRef();
  }

  componentDidMount() {
    this.projectNameInput.current.focus();
  }

  onSubmit(event) {
    this.props.AddNewProject(event.target.value)
  }
  render() {
    return (
      <form onSubmit={this.onSubmit} id="new-project-form">
	<input ref={this.projectNameInput} placeholder="Enter new project name" value={this.name}/>
        <button>add project</button>	   
      </form>
    );
  }
}

export default NewProjectForm;
