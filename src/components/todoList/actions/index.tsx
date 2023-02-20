import { v4 } from 'uuid';

export const addTask = (name: string, projectId: number) => ({
  type: 'ADD_TASK', name, projectId, id: v4(),
});
export const removeTask = (id: number) => ({ type: 'REMOVE_TASK', id });
export const updateTask = (id: number, name: string) => ({ type: 'UPDATE_TASK', id, name });

export const addProject = (name: string) => ({ type: 'ADD_PROJECT', name, id: v4() });
export const removeProject = (id: number) => ({ type: 'REMOVE_PROJECT', id });
export const updateProject = (id: number, name: string) => ({ type: 'UPDATE_PROJECT', id, name });

export const setToken = (token: string) => ({ type: 'SET_TOKEN', token });
export const removeToken = () => ({ type: 'REMOVE_TOKEN' });
