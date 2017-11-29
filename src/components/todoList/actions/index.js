let taskID;
export const createTask = (name) => ({ type: 'CREATE_TASK', name, id: taskID++ });
export const createProject = (name) => ({ type: 'CREATE_PROJECT', name });