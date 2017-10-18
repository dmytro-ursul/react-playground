import React, { Component } from 'react';
import TodoList from './components/todoList/TodoList';


const tasks1 = [
  { name: 'hello', id: 1 },
  { name: 'world', id: 2 }
]

const tasks2 = [
  { name: 'java', id: 3 },
  { name: 'script', id: 4 }
]

const projects = [
  { name: "todos1", tasks: tasks1, id: 1 },
  { name: "todos2", tasks: tasks2, id: 2 }
]

class App extends Component {
  render() {
    return (
      <div className="App">
        <TodoList projects={projects}></TodoList>
      </div>
    );
}
}

export default App;
