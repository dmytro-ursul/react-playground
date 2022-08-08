import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.css';
import './styles/todoList.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { loadState, saveState } from './localStorage';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './components/todoList/reducers';

const persistedState = loadState();

const store = createStore(reducer, persistedState);

store.subscribe(() => {
  saveState(store.getState());
});

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
