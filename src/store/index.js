import { createStore, combineReducers  } from 'redux';

import app from './reducers/app'

const reducers = {
  app
}

const rootReducers = combineReducers(reducers)

export default createStore(rootReducers)
