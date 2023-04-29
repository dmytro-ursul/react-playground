import React, { useState } from 'react';
import { useCreateProjectMutation } from './services/apiSlice';

interface CreateProjectResponse {
  data: {
    createProject: {
      project: {
        id: number;
        name: string;
      }
    }
  }
}

const NewProjectForm = () => {
  const [name, setName] = useState('');
  const [createProject] = useCreateProjectMutation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createProject(name);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} id="new-project-form">
      <input autoFocus value={name} onChange={handleChange} />
      <input className="btn btn-secondary" type="submit" value="add project" />
    </form>
  );
};

export default NewProjectForm;
