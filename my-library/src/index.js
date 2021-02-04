import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { applyMiddleware, createStore } from 'redux';
import reducer from './store/reducer';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import Navigation from './componetns/Navigation';
const store = createStore(reducer, applyMiddleware(logger))

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
      <Navigation></Navigation>
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

