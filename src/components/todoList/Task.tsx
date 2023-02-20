import React, { useState } from 'react';
import { connect } from 'react-redux';
import { removeTask, updateTask } from './actions';

type Props = {
  id: number,
  name: string,
  updateTask: (id: number, name: string) => void,
  removeTask: (id: number) => void,
};

const Task = ({ id, name, removeTask, updateTask }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState(name);
  const [oldName, setOldName] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateTask(id, taskName);
    setIsEditing(false);
  };

  const editTask = () => {
    setOldName(taskName);
    setIsEditing(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setTaskName(oldName);
      setIsEditing(false);
    }
  };

  return (
    <div className="task-box">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            className="editTask"
            autoFocus
            value={taskName}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
          />
        </form>
      ) : (
        <p className="task" onClick={editTask}>
          {taskName}
        </p>
      )}
      <button
        className="btn-close"
        type="button"
        aria-label="Delete task"
        onClick={() => removeTask(id)}
      />
    </div>
  );
};

export default connect(null, { removeTask, updateTask })(Task);
