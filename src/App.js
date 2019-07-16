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
		this.addNewProject = this.addNewProject.bind(this);
  }

  addNewProject(name) {
		const project = {
			name,
			id: Math.random(),
			items: []
		};
    const projects = [...this.state.projects, project];
    this.setState({projects});
  }

  render() {
		let projectList = null;
		if (this.state.projects.length === 0){
			projectList = <p>nothing to show</p>;
		} else {
			projectList = <TodoList projects={this.state.projects}></TodoList>;
		}
    return (
      <div className="App">
        <NewProjectForm addNewProject={this.addNewProject}> </NewProjectForm>
				{ projectList }
      </div>
    );
  }
}

export default App;
