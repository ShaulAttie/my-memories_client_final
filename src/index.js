import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
////
import { Provider } from "react-redux"
import { legacy_createStore, applyMiddleware, compose } from 'redux'; //legacy_createStore ... instead import { createStore } from 'redux';
import thunk from "redux-thunk"
import reducers from "./reducers"
////

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = legacy_createStore(reducers, compose(applyMiddleware(thunk)))

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);