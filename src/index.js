import './index.css';
import './todoList.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './components/todoList/reducers'

import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer);

ReactDOM.render(
  <Provider>
    <App store={store}/>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker();
