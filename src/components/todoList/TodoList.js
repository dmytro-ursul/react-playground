import React, { Component } from 'react'
import Project from './Project.js'
import { connect } from 'react-redux'
// import { dispatch } from 'redux'
// import * as TodoActionCreators from './actions'

class TodoList extends Component {
  // constructor(props){
  //   super(props)
  // }

  render() {
    let { projects } = this.props
    const projectList = projects.map(project => (
      <Project key={project.id} id={project.id} name={project.name} />
    ))
    return <div id="project-list">{projectList}</div>
  }
}

const mapStateToProps = state => ({
  projects: state.projects
})

export default connect(
  mapStateToProps,
  null
)(TodoList)
