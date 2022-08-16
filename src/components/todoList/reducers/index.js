import { combineReducers } from 'redux';
import tasks from './tasks';
import projects from './projects';
import token from './token';

const todoList = combineReducers({
  tasks,
  projects,
  token
});

export default todoList;
