import React, { Component } from 'react';
import { createTask } from './actions'
import { connect } from 'react-redux'


class TaskForm extends Component {
  constructor({ dispatch }){
    super({ dispatch });
    this.dispatch = dispatch;
    this.input = null;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
  }

  handleSubmit(){
    this.dispatch(createTask(this.input.value))
  }

  render(){
    return (
      <div>
        <form className="task-form" onSubmit={this.handleSubmit}>
          <input type="text"
                 ref={node => {
                   this.input = node
                 }}
                 onChange={this.handleChange}
                 placeholder="Please enter task name"/>
        </form>
      </div>
    )
  }
}

TaskForm = connect()(TaskForm);

export default TaskForm