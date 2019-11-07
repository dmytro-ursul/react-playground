import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './components/todoList/reducers'

let initialState = {
  projects: [ {id: 12345, name: 'initial', items: []} ]
}

const store = createStore(reducer, initialState);


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    div
  );
});
