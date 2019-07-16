import React, { Component } from 'react';

class NewProjectForm extends Component {

  constructor(props){
    super(props)
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
    this.state = {
    	name: ''
    };
    this.projectNameInput = React.createRef();
  }

  componentDidMount() {
    this.projectNameInput.current.focus();
  }

  onChange(event) {
    this.setState({name: event.target.value})
  }

  onSubmit(event) {
		event.preventDefault();
    this.props.addNewProject(this.state.name);
		this.setState({name: ''})
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} id="new-project-form">
				<input ref={this.projectNameInput} value={this.state.name} onChange={this.onChange}/>
        <button>add project</button>
      </form>
    );
  }
}

export default NewProjectForm;
