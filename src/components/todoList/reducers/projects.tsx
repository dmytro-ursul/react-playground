const projects = (draft: Array<{id: number, name: string}> = [], action: { type: string; id: number; name: string; }) => {
  switch (action.type) {
    case 'ADD_PROJECT':
      return draft.push({ id: action.id, name: action.name });
    case 'REMOVE_PROJECT':
      return draft.filter((project) => project.id !== action.id);
    case 'UPDATE_PROJECT':
      const index = draft.findIndex((project) => project.id === action.id);
      draft[index].name = action.name;
      return draft;
    default:
      return draft;
  }
};

export default projects;
