import React, { Component } from 'react';
import { createTask } from './actions'
import { connect } from 'react-redux'


class TaskForm extends Component {
  constructor(props){
    super(props);
    this.dispatch = props.dispatch;
    this.textInput = React.createRef();
  }

  handleSubmit(){
    this.dispatch(createTask(this.input.value))
  }

  render(){
    return (
      <div>
        <form className="task-form" onSubmit={ this.handleSubmit }>
          <input type="text"
                 ref={ this.textInput }
                 placeholder="Please enter task name"/>
	  <input type="button" value="add task" onClick={ this.handleSubmit } />
        </form>
      </div>
    )
  }
}

TaskForm = connect()(TaskForm);

export default TaskForm
