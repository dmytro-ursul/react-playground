const token = (state = null, action: { type: string; token: string; }) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.token;
    case 'REMOVE_TOKEN':
      return null;
    default:
      return state;
  }
}

export default token;
