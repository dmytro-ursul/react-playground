import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import Project from './Project';
import NewProjectForm from "./NewProjectForm";
import { Navigate } from "react-router-dom";
import { removeToken } from "./actions";

function TodoList(props) {
  const { projects, token, removeToken } = props;
  const projectList = projects.map((project) => (
    <Project key={project.id} id={project.id} name={project.name} />
  ));
  return(
    <div>
      { token ? null : <Navigate to="/login" /> }
      <button className="btn btn-primary logout" onClick={() => { removeToken() }}>Logout</button>
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
  token: state.token,
});

export default connect(
  mapStateToProps,
  { removeToken },
)(TodoList);
