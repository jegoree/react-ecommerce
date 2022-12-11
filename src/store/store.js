import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from 'redux';

import { rootReducer } from './root-reducer';

// Middleware is just a curried functions that run prior to
// pasing the action to the reducers
const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log('type: ', action.type);
  console.log('payload: ', action.payload);
  console.log('currentState ', store.getState());

  next(action);

  console.log('next state: ', store.getState());
};

const middleWares = [loggerMiddleware];

const composedEnchancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnchancers);
