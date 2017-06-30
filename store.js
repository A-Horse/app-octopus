import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createEpicMiddleware } from 'redux-observable';
import thunkMiddleware from 'redux-thunk';
import { autoRehydrate } from 'redux-persist';

import { registerScreens } from './screens';
import appReducer from './reducer';
import rootEpic from './epic';

const epicMiddleware = createEpicMiddleware(rootEpic);

let store = setupStore();

function setupStore() {
  const store = createStore(
    appReducer,
    compose(applyMiddleware(thunkMiddleware, epicMiddleware), autoRehydrate())
  );
  registerScreens(store, Provider);
  return store;
}

export default store;

export function initialStore() {
  store = setupStore();
}
