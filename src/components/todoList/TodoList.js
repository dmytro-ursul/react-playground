import React, { Component } from 'react';
import Project from './Project.js';
import { connect } from 'react-redux'

class TodoList extends Component {
  constructor(props){
    super(props)
    this.state = { projects: props.projects };
  }

  createProject(){
    //debugger;
  }

  render() {
    const projects = this.state.projects.map((project) =>
      <Project project={project} key={project.id}/>
    );
    return (
      <div id="project-list">
        {projects}
      </div>
    );
  }
}

TodoList = connect()(TodoList);

export default TodoList;
