import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.css';
import './styles/todoList.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { loadState, saveState } from './localStorage';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import reducer from './components/todoList/reducers';
import { BrowserRouter } from 'react-router-dom';
import client from './client';
import { ApolloProvider } from "@apollo/client";

const preloadedState = loadState();

const store = configureStore({
  reducer, preloadedState
});

store.subscribe(() => {
  saveState(store.getState());
});

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
