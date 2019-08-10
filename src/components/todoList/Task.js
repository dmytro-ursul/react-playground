import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeTask } from './actions'

class Task extends Component {
  render() {
    let { name, id, removeTask } = this.props

    return (
      <li>
        <p className="task">name</p>
        <span clasName="remove-item" onClick={ () => removeTask(id) }>x</span>
      </li>
    )
  }
}

export default connect(
  null,
  { removeTask }
)(Task)
