import React, { Component } from 'react';
import TodoItem from './todoItem';
import TodoForm from "./todoForm";

class TodoProject extends Component {
  constructor(props){
    super(props)
    this.todoItems = props.todoItems;
  }

  createTodo(){

  }

  render() {
    const todoItems = this.todoItems.map((todoItem) =>
      <TodoItem todoItem={todoItem} key={todoItem.id}></TodoItem>
    )
    return (
      <div>
        <TodoForm/>
        <input type="button" onclick={this.createTodo}/>
        <ul className="todoList">
          {todoItems}
        </ul>
      </div>
    );
  }
}

export default TodoProject;
