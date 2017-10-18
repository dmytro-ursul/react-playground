import React, { Component } from 'react';

class ProjectHeader extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: props.name
    }
  }

  render(){
    return (
      <div className="project-header">{this.state.name}</div>
    )
  }
}

export default ProjectHeader