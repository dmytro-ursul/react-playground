import React, { Component } from 'react';
import { createTask } from './actions'

class TaskForm extends Component {
  constructor(props){
    super(props);
    this.dispatch = props.dispatch
    this.input = null;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    // this.setState({task: e.target.value})
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

export default TaskForm