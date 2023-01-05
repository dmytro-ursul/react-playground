import client from './client';
import { GET_STATE, SAVE_STATE } from "./queries";

export const loadState = () => {
  const serializedState = localStorage.getItem('state');
  if (serializedState === null) {
    loadFromServer();
  } else {
    return JSON.parse(serializedState);
  }
};

export const loadFromServer = () => {
  client
    .query({
      query: GET_STATE,
    })
    .then((result) => console.log(result));
}

export const persistToServer = (state) => {
  const token = localStorage.getItem('token');

  client
    .mutate({
      mutation: SAVE_STATE,
      variables: {
        name: state.name,
      },
    })
    .then((result) => console.log(result));
}

export const saveState = (state) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem('state', serializedState);
  persistToServer(state);
};
