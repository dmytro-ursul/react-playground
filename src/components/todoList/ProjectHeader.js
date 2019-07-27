import React, { Component } from 'react'
import { removeProject } from './actions'
import { connect } from 'react-redux'

class ProjectHeader extends Component {
  // constructor(props){
  //   super(props);
  // }

  render() {
    let { name, id, removeProject } = this.props
    return (
      <div className="project-header">
        {name}
        <span className="delete-project" onClick={() => removeProject(id)}>
          x
        </span>
      </div>
    )
  }
}

export default connect(
  null,
  { removeProject }
)(ProjectHeader)
