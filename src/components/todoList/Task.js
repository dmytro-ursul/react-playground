import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeTask, updateTask } from './actions'

class Task extends Component {

  constructor(props){
    super(props)
    this.state = {
      isEditing: false,
      name: props.name
    }
  }

  onChange = event => {
    this.setState({name: event.target.value})
  }

  onSubmit = event => {
    event.preventDefault()
    this.props.updateTask(this.props.id, this.state.name)
    this.setState({isEditing: false})
  }

  editTask = () => {
    this.setState({isEditing: true})
  }

  render() {
    let { id, removeTask } = this.props

    return (
      <li>
          { this.state.isEditing ? <form onSubmit={this.onSubmit}>
                                      <input className="editTask"
                                             autoFocus={true}
                                             value={this.state.name}
                                             onChange={this.onChange}/>
                                   </form>
                                 : <p className="task" onClick={this.editTask}>{ this.state.name }</p> }
        <span className="remove-item" onClick={ () => removeTask(id) }>x</span>
      </li>
    )
  }
}

export default connect(
  null,
  { removeTask, updateTask }
)(Task)
