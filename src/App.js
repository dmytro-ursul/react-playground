import React, { Component } from 'react';
import TodoList from './components/todoList/todoList';


const todoItems1 = [
  { description: 'hello', id: 1 },
  { description: 'world', id: 2 }
]

const todoItems2 = [
  { description: 'java', id: 1 },
  { description: 'script', id: 2 }
]

const todoProjects = [
  todoItems1, todoItems2
]

class App extends Component {
  render() {
    return (
      <div className="App">
        <TodoList todoItems={todoItems}></TodoList>
      </div>
    );
  }
}

export default App;
