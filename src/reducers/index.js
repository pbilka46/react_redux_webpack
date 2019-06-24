import { combineReducers } from 'redux';

import basic from './createReducer';
import createObject from './createObject';
import createList, * as fromList from './createList';
import createMessagesReducer, * as fromMessages from './messagesReducer';

export default combineReducers({
  account: createObject('user'),
  groups: createList('groups'),
  messages: createMessagesReducer(),
});

export const getAllEntities = state => fromList.getAllEntities(state);
export const getEntityById = (state, id) => fromList.getEntityById(state, id);
export const getEntitiesIds = state => fromList.getEntitiesIds(state);
export const getEntitiesLength = state => fromList.getEntitiesLength(state);

export const getSelectedGroup = state => fromMessages.getSelectedGroup(state);
export const getMessagesByGroupId = (state, selected) => fromMessages.getMessagesByGroupId(state, selected);
