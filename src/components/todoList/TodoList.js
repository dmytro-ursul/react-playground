import React, { Component } from 'react';
import Project from './Project.js';
import { connect } from 'react-redux'

class TodoList extends Component {
  constructor(props){
    super(props)
    this.state = { projects: props.projects };
  }

  createProject() {
    //debugger;
  }

  deleteProject(e) {
    this.props.deleteProject(e.target.key)
	}

  render() {
		this.state.projects = this.props.projects;
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
