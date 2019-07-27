import React, { Component } from 'react'
import NewProjectForm from './components/todoList/NewProjectForm'
import TodoList from './components/todoList/TodoList'
// import { createStore } from 'redux'

class App extends Component {
  render() {
    let projectList = null
    if (this.state.projects.length === 0) {
      projectList = <p>nothing to show</p>
    } else {
      projectList = (
        <TodoList
          projects={this.state.projects}
          deleteProject={this.deleteProject}
        ></TodoList>
      )
    }
    return (
      <div className="App">
        <NewProjectForm />
        {projectList}
      </div>
    )
  }
}

export default App
