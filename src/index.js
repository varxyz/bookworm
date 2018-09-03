import React from 'react';
import { install } from 'offline-plugin/runtime';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { AppContainer } from 'react-hot-loader';
import App from './components/app';
import reducers from './reducers';
import store from './store';
// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
// install();
const store1 = createStore(
  reducers,
  applyMiddleware(thunk)
);
ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  document.querySelector('.container'),
);
