import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import Project from './Project';
import NewProjectForm from "./NewProjectForm";

// import { dispatch } from 'redux'
// import * as TodoActionCreators from './actions'

function TodoList(props) {
  const { projects } = props;
  const projectList = projects.map((project) => (
    <Project key={project.id} id={project.id} name={project.name} />
  ));
  return(
    <div>
      <NewProjectForm/>
      <div id="project-list">{projectList}</div>
    </div>
  );
}

TodoList.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  projects: state.projects,
});

export default connect(
  mapStateToProps,
  null,
)(TodoList);
