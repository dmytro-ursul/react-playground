const tasks = (state = [], action) => {
    switch(action.type) {
        case 'CREATE_TASK':
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    completed: action.completed
                }
            ]
        case 'REMOVE_TODO':
            return []
        default:
            return state

    }
}