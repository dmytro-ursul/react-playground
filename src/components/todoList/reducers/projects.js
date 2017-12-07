const projects = (state = [], action) => {
  switch(action.type) {
    case 'CREATE_PROJECT':
      return [
        ...state,
        {
          id: action.id,
          name: action.name
        }
      ]
    case 'REMOVE_PROJECT':
      return []
    default:
      return state
  }
};

export default projects