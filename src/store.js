import { createStore } from 'redux';
import Chef from './redux-chef/index.ts';
import models from './models';

const { reducer, preloadState } = Chef(models);

const store = createStore(
  reducer,
  preloadState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

Chef.apply(store);

export default store;
