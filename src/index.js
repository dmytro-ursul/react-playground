import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './todoList.css';
import App from './App';
import { combineReducers } from 'redux'

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

combineReducers
