import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeTask } from './actions'

class Task extends Component {

  constructor(props){
    super(props)
    this.state = {
      isEditing: false,
      name: props.name
    }
  }

  onChange = (event) => {
    this.setState({name: event.target.value})
  }

  editTask = () => {
    this.setState({isEditing: true})
  }

  render() {
    let { name, id, removeTask } = this.props

    return (
      <li>
          { this.state.isEditing ? <input className="editTask" value={this.state.name} onChange={this.onChange}/>
                                 : <p className="task" onClick={this.editTask}>{ name }</p> }
        <span className="remove-item" onClick={ () => removeTask(id) }>x</span>
      </li>
    )
  }
}

export default connect(
  null,
  { removeTask }
)(Task)
