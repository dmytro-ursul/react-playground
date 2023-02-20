import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTask } from './features/tasksSlice';

interface TaskFormProps {
  projectId: number;
}

function TaskForm ({ projectId }: TaskFormProps) {
  const [name, setName] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = Math.floor(Math.random() * 1000000);
    addTask({id, name, projectId, completed: false});
    setName('');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="input-group-sm flex">
        <input
          type="text"
          className="text-enter"
          value={name}
          onChange={handleChange}
          placeholder="Please enter task name"
        />
        <input className="task-add btn btn-primary" type="submit" value="add task" />
      </div>
    </form>
  );
};

export default connect(
  null,
  { addTask },
)(TaskForm);
