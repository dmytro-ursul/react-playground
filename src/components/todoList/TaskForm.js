import React, { Component } from 'react';

class TaskForm extends Component {
  constructor(props){
    super(props);
    this.state = {task: ''}
  }

  handleChange(e){
    this.setState({task: e.target.value})
  }

  handleSubmit(){

  }

  render(){
    return (
      <div>
        <form className="task-form">
          <input type="text" value={this.state.task}
                 onChange={this.handleChange}
                 onSubmit={this.handleSubmot}
                 placeholder="Please type your todo name"/>
        </form>
      </div>
    )
  }
}

export default TaskForm