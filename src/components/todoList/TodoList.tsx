import React from 'react';
import { useGetProjectsQuery } from './services/apiSlice';
import NewProjectForm from './NewProjectForm';
import { Navigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {setToken} from "./features/authSlice";
import {RootState} from "../../store";
import SortableProjectList from './SortableProjectList';

interface ProjectProps {
  id: number;
  name: string;
  position: number;
  tasks?: {
    id: number;
    name: string;
    projectId: number;
    completed: boolean;
    position: number;
  }[];
}

const TodoList = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const {
    data: { projects } = { projects: [] },
    error,
    isLoading,
  } = useGetProjectsQuery({ skip: !token });

  const removeToken = () => {
    dispatch(setToken(null));
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error :(</p>;
  }

  return (
    <div>
      { token ? null : <Navigate to="/login" />}
      {/*display user fullname*/}
      <button className="btn btn-primary logout right" onClick={() => removeToken()}>
        Logout
      </button>
      <span className="right m-r-30">{user.firstName} {user.lastName}</span>
      <NewProjectForm />
      <SortableProjectList projects={projects} />
    </div>
  );
}

export default TodoList
