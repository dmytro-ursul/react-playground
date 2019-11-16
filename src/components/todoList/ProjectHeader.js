import React, { Component } from 'react'
import { removeProject, updateProject } from './actions'
import { connect } from 'react-redux'

class ProjectHeader extends Component {

  constructor(props){
    super(props);
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
    this.props.updateProject(this.props.id, this.state.name)
    this.setState({isEditing: false})
  }

  editProject = () => {
    this.setState({isEditing: true})
  }

  render() {

    let { id, removeProject } = this.props

    return (
      <div className="project-header">
          { this.state.isEditing ?
                      <form onSubmit={this.onSubmit}>
                        <input className="editProject"
                               autoFocus={true}
                               value={this.state.name}
                               onChange={this.onChange}/>
                       </form>
                     : <p className="project-name" onClick={this.editProject}>{ this.state.name }</p>
        }
        <span className="remove-item" onClick={() => removeProject(id)}>
          x
        </span>
      </div>
    )
  }
}

export default connect(
  null,
  { removeProject, updateProject }
)(ProjectHeader)
