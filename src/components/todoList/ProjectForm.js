import React, { Component } from 'react';

class ProjectForm extends Component {
  constructor(props){
    super(props);
    this.state = {task: ''}
  }

  handleChange(e){
    this.setState({task: e.target.value})
  }

  handleSubmit(){

  }

  render(){
    return (
      <div>
        <form className="project-form">
          <input type="text" value={this.state.task}
                 onChange={this.handleChange}
                 onSubmit={this.handleSubmit}
                 placeholder="Please type your todo name"/>
        </form>
      </div>
    )
  }
}

export default ProjectForm;