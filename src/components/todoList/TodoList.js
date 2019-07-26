import React, { Component } from 'react';
import Project from './Project.js';
import { connect } from 'react-redux'
// import { dispatch } from 'redux'
// import * as TodoActionCreators from './actions'

class TodoList extends Component {
  // constructor(props){
  //   super(props)
  // }


  deleteProject(e) {
    this.props.deleteProject(e.target.key)
	}

  render() {
		let { projects } = this.props;
    const projectList = projects.map((project) =>
      <Project items={[]} name={project.name} key={project.id}/>
    );
    return (
      <div id="project-list">
        {projectList}
      </div>
    );
  }
}

const mapStateToProps = state => ({
	projects: state.projects
})

TodoList = connect(mapStateToProps, null)(TodoList);

export default TodoList;
