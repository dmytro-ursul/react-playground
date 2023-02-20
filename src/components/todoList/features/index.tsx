import { combineReducers } from 'redux';
import tasksSlice from './tasksSlice';
import projectsSlice from './projectsSlice';
import tokenSlice from './tokenSlice';
import  { apiSlice } from '../services/apiSlice';

export default combineReducers({
  tasks: tasksSlice,
  projects: projectsSlice,
  token: tokenSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
});
