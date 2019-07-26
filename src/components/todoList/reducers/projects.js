let initialState = [ {id: 12345, name: 'initial', items:[]} ];

const projects = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_PROJECT':
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
