import { createStore, combineReducers  } from 'redux';

import appReducer from './reducers/app'
import userReducer from './reducers/user'

const reducers = {
  app: appReducer,
  user: userReducer
}

const rootReducers = combineReducers(reducers)

export default createStore(rootReducers)
