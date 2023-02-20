interface Task {
  id: number;
  name: string;
  completed: boolean;
  projectId: number;
}

const tasks = (state: Task[] = [], action: { type: string; id: number; name: string; completed: boolean; projectId: number; }): Task[] => {
  switch (action.type) {
    case 'ADD_TASK':
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          completed: action.completed,
          projectId: action.projectId,
        },
      ];
    case 'REMOVE_TASK':
      return state.filter((task) => task.id !== action.id);
    case 'UPDATE_TASK':
      return state.map((task) => (task.id === action.id
        ? { ...task, name: action.name }
        : task));
    default:
      return state;
  }
};

export default tasks;
