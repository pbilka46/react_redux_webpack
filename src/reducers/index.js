import { combineReducers } from 'redux';

import basic from './createReducer';
import createObject from './createObject';
import createList, * as fromList from './createList';
import createMessagesReducer, * as fromMessages from './messagesReducer';
import * as types from '../constants/actionTypes';

import chat, * as fromChat from './chat';
import windowReducer, * as fromWindow from './window';

export default combineReducers({
  account: createObject('user'),
  groups: createList(types.GROUPS),
  chat,
  window: windowReducer
});

export const getAllEntities = state => fromList.getAllEntities(state);
export const getEntityById = (state, id) => fromList.getEntityById(state, id);
export const getEntitiesIds = state => fromList.getEntitiesIds(state);
export const getEntitiesLength = state => fromList.getEntitiesLength(state);

export const getSelectedGroup = state => fromWindow.getSelectedGroup(state);
export const getMessagesByGroupId = (state, selected) => fromMessages.getMessagesByGroupId(state, selected);


export const getMessages = (state, selected) => fromChat.getMessages(state, selected);
