import './index.css';
import './todoList.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './components/todoList/reducers'

import registerServiceWorker from './registerServiceWorker';
import { loadState, saveState } from './localStorage'

const persistedState = loadState();

const store = createStore(reducer, persistedState);

store.subscribe(() => {
  saveState(store.getState());
})

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker();
