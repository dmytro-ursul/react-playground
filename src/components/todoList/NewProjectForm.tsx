import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addProject } from './actions';

const NewProjectForm = () => {
  const [name, setName] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addProject(name);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} id="new-project-form">
      <input
        autoFocus
        value={name}
        onChange={handleChange}
      />
      <input className="btn btn-secondary" type="submit" value="add project" />
    </form>
  );
};

export default connect(
  null,
  { addProject },
)(NewProjectForm);
