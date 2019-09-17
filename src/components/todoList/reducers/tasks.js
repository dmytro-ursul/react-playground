const tasks = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          completed: action.completed,
          project_id: action.project_id
        }
      ]
    case 'REMOVE_TASK':
      return state.filter(task => task.id !== action.id)
    case 'UPDATE_TASK':
      return state.map(task =>
        task.id === action.id ?
          {...task, name: action.name} :
          task
      )
    default:
      return state
  }
}

export default tasks
