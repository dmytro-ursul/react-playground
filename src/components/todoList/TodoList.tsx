import React from 'react';
import { useGetProjectsQuery } from './services/apiSlice';
import { useState } from 'react';
import Project from './Project';
import NewProjectForm from './NewProjectForm';
import { Navigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {setToken} from "./features/authSlice";
import {RootState} from "../../store";

interface ProjectProps {
  id: number;
  name: string;
  tasks?: {
    id: number;
    name: string;
    projectId: number;
    completed: boolean;
  }[];
}

const TodoList = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();
  const {
    data: { projects } = { projects: [] },
    error,
    isLoading,
  } = useGetProjectsQuery({ refetchOnMountOrArgChange: true }, { skip: !token });

  const removeToken = () => {
    dispatch(setToken(null));
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error :(</p>;
  }

  const projectList = projects.map((project: ProjectProps) => (
    <Project key={project.id} id={project.id} name={project.name} tasks={project.tasks} />
  ));

  return (
    <div>
      { token ? null : <Navigate to="/login" />}
      <button className="btn btn-primary logout" onClick={() => removeToken()}>
        Logout
      </button>
      <NewProjectForm />
      <div id="project-list">{projectList}</div>
    </div>
  );
}

export default TodoList
