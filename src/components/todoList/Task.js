import React, { Component } from 'react'

class Task extends Component {
  render() {
    let { name } = this.props.name

    return <li className="task">{name}</li>
  }
}

export default Task
