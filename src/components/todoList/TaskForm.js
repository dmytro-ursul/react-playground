import React, { Component } from 'react'
import { addTask } from './actions'
import { connect } from 'react-redux'

class TaskForm extends Component {
  constructor(props) {
    super(props)
    this.textInput = React.createRef()
    this.state = { name: '' }
  }

  handleSubmit = event => {
    event.preventDefault()
    let { name } = this.state
    let { project_id } = this.props
    this.props.addTask(name, project_id)
    this.setState({ name: '' })
  }

  onChange = event => {
    this.setState({ name: event.target.value })
  }

  render() {
    return (
      <form className="task-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          ref={this.textInput}
          value={this.state.name}
          onChange={this.onChange}
          placeholder="Please enter task name"
        />
        <input type="button" value="add task" onClick={this.handleSubmit} />
      </form>
    )
  }
}

export default connect(
  null,
  { addTask }
)(TaskForm)
