export const loadState = () => {
  const serializedState = localStorage.getItem('state');
  if (serializedState == null) return;

  return JSON.parse(serializedState);
};

export const saveState = (state: any) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem('state', serializedState);
};
