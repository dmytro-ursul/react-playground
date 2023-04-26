import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Project {
  id?: number;
  name: string;
}

const projectsSlice = createSlice({
  name: 'projects',
  initialState: [] as Project[],
  reducers: {
    addProject: (state, action: PayloadAction<{ name: string }>) => {
      state.push(action.payload);
    },
    removeProject: (state, action: PayloadAction<{ id: number }>) => {
      const index = state.findIndex((project) => project.id === action.payload.id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.findIndex((project) => project.id === action.payload.id);
      state[index].name = action.payload.name;
    },
  },
});

export const { addProject, removeProject, updateProject } = projectsSlice.actions;

export default projectsSlice.reducer;
