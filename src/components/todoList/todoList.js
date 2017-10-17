import React, { Component } from 'react';
import TodoProject from './todoProject'

class TodoList extends Component {
  constructor(props){
    super(props)
    this.todoItems = props.todoItems;
  }

  createTodo(){

  }

  render() {
    const todoItems = this.todoItems.map((todoItem) =>
      <TodoItem todoItem={todoItem.body} key={todoItem.id}></TodoItem>
    )
    const todoProjects = this.todoProjects.map((todoProject) =>
      <TodoProject todoProject={todoProject.body} key={todoProject.id}></TodoProject>
    )
    return (
      <div id="todoList">
        <TodoProject></TodoProject>
      </div>
    );
  }
}

export default TodoList;
