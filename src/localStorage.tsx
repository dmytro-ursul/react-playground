export const loadState = () => {
  const serializedState = localStorage.getItem('state');
  if (serializedState === null) {
    loadFromServer();
  } else {
    return JSON.parse(serializedState);
  }
};

export const loadFromServer = () => {
}

export const saveState = (state: any) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem('state', serializedState);
};
