import { combineReducers } from 'redux';

import createAccountObject from './createAccountObject';
import createList, * as fromList from './createList';
import * as types from '../constants/actionTypes';

import chat, * as fromChat from './chat';
import windowReducer, * as fromWindow from './window';

export default combineReducers({
  account: createAccountObject('user'),
  groups: createList(types.GROUPS),
  friends: createList('FRIENDS'),
  chat,
  window: windowReducer
});

export const getAllEntities = state => fromList.getAllEntities(state);

// TODO: remove if unnecessary for further developments
export const getEntityById = (state, id) => fromList.getEntityById(state, id);
export const getEntitiesIds = state => fromList.getEntitiesIds(state);
export const getEntitiesLength = state => fromList.getEntitiesLength(state);


export const getSelectedGroup = state => fromWindow.getSelectedGroup(state);
export const getMessages = (state, selected) => fromChat.getMessages(state, selected);
