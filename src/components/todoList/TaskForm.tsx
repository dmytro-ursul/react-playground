import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useCreateTaskMutation} from "./services/apiSlice";

const TaskForm = ({ projectId }: { projectId: number }) => {
  const [name, setName] = useState('');
  const [createTask] = useCreateTaskMutation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = Math.floor(Math.random() * 1000000);
    createTask({ name, projectId: +projectId });
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

export default TaskForm;
