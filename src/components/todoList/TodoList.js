import React, { Component } from 'react';
import Project from './Project.js';
import Task from "./Task.js";

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

export default TodoList;
