import React, { Component } from 'react';

class NewProjectForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: props.project.name
    }
  }
  render() {
    return (
      <div className="App">
        <input placeholder="project_name" value={this.state.name}/>
        <button>add project</button>	   
      </div>
    );
  }
}

export default NewProjectForm;
