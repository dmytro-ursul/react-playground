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
		let { id, name, items } = this.props
    return (
      <div className="project">
				<ProjectHeader name={name} id={id} />
				<TaskForm />
        <ul className="task-list">
          {items.map((task) =>
						<Task name={task.name} key={task.id} />
          )}
        </ul>
      </div>
    );
  }
}

Project = connect()(Project);

export default Project;
