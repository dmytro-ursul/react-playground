import React, { Component } from 'react'
import ProjectHeader from './ProjectHeader.js'
import TaskForm from './TaskForm.js'
import Task from './Task.js'
import { connect } from 'react-redux'

class Project extends Component {
  componentDidMount() {}

  render() {
    let { id, name, items } = this.props

    return (
      <div className="project">
        <ProjectHeader name={name} id={id} />
        <TaskForm project_id={id} />
        <div className="task-list">
          {items.map(task => (
            <Task name={task.name} id={task.id} key={task.id} />
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  items: state.tasks.filter(task => task.project_id === ownProps.id)
})

export default connect(
  mapStateToProps,
  null
)(Project)
