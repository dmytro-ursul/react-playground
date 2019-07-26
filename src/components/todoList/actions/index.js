let projectId = 0;
let taskId = 0;
export const createTask = (name) => ({ type: 'CREATE_TASK', name, id: ++taskId });
export const addProject = (name) => ({ type: 'ADD_PROJECT', name, id: ++projectId });
export const removeProject = (id) => ({ type: 'REMOVE_PROJECT', id });
