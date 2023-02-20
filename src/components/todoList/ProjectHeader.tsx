import React, { useState } from 'react';
import { connect } from 'react-redux';
import { removeProject, updateProject } from './actions';

type Props = {
  id: number,
  name: string,
  updateProject: (id: number, name: string) => void,
  removeProject: (id: number) => void,
};

const ProjectHeader = ({ id, name, updateProject, removeProject }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [projectName, setProjectName] = useState(name);
  const [oldName, setOldName] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(event.target.value);
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateProject(id, projectName);
    setIsEditing(false);
  }

  const editProject = () => {
    setOldName(projectName);
    setIsEditing(true);
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
      setProjectName(oldName);
    }
  }

  return (
    <div className="project-header">
      { isEditing
        ? (
          <form onSubmit={onSubmit}>
            <input
              className="editProject"
              autoFocus
              value={projectName}
              onKeyDown={handleKeyDown}
              onChange={onChange}
            />
          </form>
        )
        : (
          <p className="project-name" onClick={editProject}>
            { projectName }
          </p>
        )}
      <button
        className="btn-close"
        type="button"
        aria-label="Delete project"
        onClick={() => removeProject(id)}
      />
    </div>
  );
}

export default connect(
  null,
  { removeProject, updateProject },
)(ProjectHeader);
