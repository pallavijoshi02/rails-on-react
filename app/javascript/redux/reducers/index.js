import { combineReducers } from 'redux';
import errors from './errors';

const appState = combineReducers({
  errors,
})

export default appState
