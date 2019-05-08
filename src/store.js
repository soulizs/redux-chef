import chef from './redux-chef';
import { createStore } from 'redux';
import models from './models';

const { reducer, preloadState } = chef(models);
const store = createStore(
  reducer,
  preloadState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

chef.apply(store);

export default store;
