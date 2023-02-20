import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Project {
  id: number;
  name: string;
}

const projectsSlice = createSlice({
  name: 'projects',
  initialState: [] as Project[],
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      state.push(action.payload);
    },
    removeProject: (state, action: PayloadAction<{ id: number }>) => {
      return state.filter((project) => project.id !== action.payload.id);
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.findIndex((project) => project.id === action.payload.id);
      state[index].name = action.payload.name;
    },
  },
});

export const { addProject, removeProject, updateProject } = projectsSlice.actions;

export default projectsSlice.reducer;
