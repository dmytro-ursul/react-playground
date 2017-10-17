import React, { Component } from 'react';

class TodoForm extends Component {
  constructor(props){
    super(props);
    this.state = {todoItem: ''}
  }

  handleChange(e){
    this.setState({todoItem: e.target.value})
  }

  handleSubmit(){

  }

  render(){
    return (
      <div>
        <form className="todoForm">
          <input type="text" value={this.state.todoItem}
                 onChange={this.handleChange}
                 onSubmit={this.handleSubmot}
                 placeholder="Please type your todo name"/>
        </form>
      </div>
    )
  }
}

export default TodoForm