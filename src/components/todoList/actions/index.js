import { v4 } from 'uuid';

export const addTask = (name, projectId) => ({
  type: 'ADD_TASK', name, projectId, id: v4(),
});
export const removeTask = (id) => ({ type: 'REMOVE_TASK', id });
export const updateTask = (id, name) => ({ type: 'UPDATE_TASK', id, name });

export const addProject = (name) => ({ type: 'ADD_PROJECT', name, id: v4() });
export const removeProject = (id) => ({ type: 'REMOVE_PROJECT', id });
export const updateProject = (id, name) => ({ type: 'UPDATE_PROJECT', id, name });

export const setToken = (token) => ({ type: 'SET_TOKEN', token });
export const removeToken = () => ({ type: 'REMOVE_TOKEN' });
