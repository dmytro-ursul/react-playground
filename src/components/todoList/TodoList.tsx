import { connect } from 'react-redux';
import React from 'react';
import Project from './Project';
import NewProjectForm from "./NewProjectForm";
import { Navigate } from "react-router-dom";
import { removeToken } from "./actions";

interface TodoListProps {
  projects: {
    id: number;
    name: string;
  }[];
  token: string;
  removeToken: () => void;
}

function TodoList({ projects, token, removeToken }: TodoListProps) {
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

const mapStateToProps = (state: {
  projects: TodoListProps["projects"];
  token: TodoListProps["token"];
}) => ({
  projects: state.projects,
  token: state.token,
});

export default connect(
  mapStateToProps,
  { removeToken },
)(TodoList);
