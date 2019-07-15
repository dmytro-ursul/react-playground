import React, {Component} from 'react';
import NewProjectForm from './components/todoList/NewProjectForm';
import TodoList from './components/todoList/TodoList';
// import { createStore } from 'redux'


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  };

  addNewProject = (name) => {
    const project = { name, items: [] }
    const projects = [...this.state.projects, project]
    this.setState({projects})
  };

  render() {
    return (
      <div className="App">
        <NewProjectForm></NewProjectForm>
	if (projects.length == 0){
	  <p>nothing to show</p>
	} else {
	  <TodoList projects={this.state.projects}></TodoList>
	}
      </div>
    );
  };
}

export default App;
