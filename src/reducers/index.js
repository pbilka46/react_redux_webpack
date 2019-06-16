import { combineReducers } from 'redux';

import basic from './createReducer';
import createObject from './createObject';

export default combineReducers({
  account: createObject('user')
});
