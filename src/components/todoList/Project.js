import React, { Component } from 'react';
import ProjectHeader from './ProjectHeader.js';
import TaskForm from "./TaskForm.js";
import Task from './Task.js';
import { connect } from 'react-redux'

class Project extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: props.project.name,
      tasks: props.project.tasks,
    }
  }

  createTask(e){
    e.target.value
  }

  componentDidMount(){

  }

  render() {
    return (
      <div className="project">
        <ProjectHeader name={this.state.name}></ProjectHeader>
        <TaskForm></TaskForm>
        <ul className="task-list">
          {this.state.tasks.map((task) =>
            <Task name={task.name} key={task.id}></Task>
          )}
        </ul>
      </div>
    );
  }
}

Project = connect()(Project);

export default Project;
