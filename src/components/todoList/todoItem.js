import React, { Component } from 'react';

class TodoItem extends Component {
  constructor(props){
    super(props);
    this.todoItem = props.todoItem;
  }

  render(){
    return (
      <li className="todoItem">{this.todoItem.description}</li>
    )
  }
}

export default TodoItem