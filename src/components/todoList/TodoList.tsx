import React from 'react';
import { useGetProjectsQuery } from './services/apiSlice';
import Project from './Project';
import NewProjectForm from './NewProjectForm';
import { Navigate } from 'react-router-dom';
import { removeToken } from './features/tokenSlice';
import { connect } from 'react-redux';

interface TodoListProps {
  token: string | undefined;
  removeToken: () => void;
}

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

function TodoList({ token, removeToken }: TodoListProps) {
  const { data: { projects }, error, isLoading } = useGetProjectsQuery({ refetchOnMountOrArgChange: true });

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
      {"token" ? null : <Navigate to="/login" />}
      <button className="btn btn-primary logout" onClick={removeToken}>
        Logout
      </button>
      <NewProjectForm />
      <div id="project-list">{projectList}</div>
    </div>
  );
}


const mapStateToProps = (state: { token: TodoListProps['token'] | undefined }) => ({
  token: state.token,
});

export default connect(mapStateToProps, { removeToken })(TodoList);
