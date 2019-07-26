import React, { Component } from 'react';
import ProjectHeader from './ProjectHeader.js';
import TaskForm from "./TaskForm.js";
import Task from './Task.js';
import { connect } from 'react-redux'

class Project extends Component {
  // constructor(props){
  //   super(props)
  // }

  createTask(e){
  }

  componentDidMount(){

  }

  render() {
		let { name, items } = this.props
    return (
      <div className="project">
        <ProjectHeader name={name}></ProjectHeader>
        <TaskForm></TaskForm>
        <ul className="task-list">
          {items.map((task) =>
            <Task name={task.name} key={task.id}></Task>
          )}
        </ul>
      </div>
    );
  }
}

Project = connect()(Project);

export default Project;
