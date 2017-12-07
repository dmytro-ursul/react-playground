import { combineReducers } from 'redux'
import tasks from './tasks'
import projects from './projects'

const todoList = combineReducers({
  tasks,
  projects
});

export default todoList