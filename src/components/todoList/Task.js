import React, { Component } from 'react';

class Task extends Component {
  constructor(props){
    super(props);
    this.state ={
      name: props.name,
    };
  }

  render(){
    return (
      <li className="task">{this.state.name}</li>
    )
  }
}

export default Task