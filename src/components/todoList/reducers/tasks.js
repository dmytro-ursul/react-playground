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
      return []
    default:
      return state
  }
}

export default tasks
