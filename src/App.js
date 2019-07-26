import React, {Component} from 'react';
import NewProjectForm from './components/todoList/NewProjectForm';
import TodoList from './components/todoList/TodoList';
// import { createStore } from 'redux'


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      projects: [ {id: 12345, name: 'initial', items:[]} ]
		};
		this.deleteProject = this.deleteProject.bind(this);
  }

  addProject(name) {
		const project = {
			name,
			id: Math.random(),
			items: []
		};
    const projects = [...this.state.projects, project];
    this.setState({projects});
  }

  deleteProject(id){
    this.state.projects.filter((project) =>
      project.id !== id
    )
  }

  render() {
		let projectList = null;
		if (this.state.projects.length === 0){
			projectList = <p>nothing to show</p>;
		} else {
			projectList = <TodoList projects={this.state.projects} deleteProject={this.deleteProject}></TodoList>;
		}
    return (
      <div className="App">
				<NewProjectForm />
				{ projectList }
      </div>
    );
  }
}

export default App;
