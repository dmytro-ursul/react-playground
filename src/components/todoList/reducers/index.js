import { combineReducers } from 'redux';
import tasks from './tasks';
import projects from './projects';
import token from './token';

export default combineReducers({
  tasks,
  projects,
  token
});
