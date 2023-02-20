import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id?: number;
  name: string;
  completed: boolean;
  projectId: number;
}

interface UpdateTaskPayload {
  id: number;
  name: string;
}

interface RemoveTaskPayload {
  id: number;
}

interface TaskState {
  tasks: Task[];
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: { tasks: [] } as TaskState,
  reducers: {
    addTask: (state: TaskState, action: PayloadAction<Task>) => {
      state.tasks.push({
        name: action.payload.name,
        projectId: action.payload.projectId,
        completed: false,
      });
    },
    removeTask: (state: TaskState, action: PayloadAction<RemoveTaskPayload>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
    },
    updateTask: (state: TaskState, action: PayloadAction<UpdateTaskPayload>) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.name = action.payload.name;
      }
    },
  },
});

export const { addTask, removeTask, updateTask } = tasksSlice.actions;

export default tasksSlice.reducer;
