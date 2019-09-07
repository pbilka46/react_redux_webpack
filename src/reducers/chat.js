import { combineReducers } from 'redux';
import has from 'lodash/has'

import * as types from '../constants/actionTypes';

function addMessage(state, action) {
  const { payload } = action;
  const { groupId, message } = payload;

  // Look up the correct post, to simplify the rest of the code
  return updateGroupMessages(state, groupId, message.id);
}

function addMultipleMessages(state, action) {
  const { payload } = action;
  const { groupId, allIds: messages } = payload;
  
  // Look up the correct post, to simplify the rest of the code
  return updateGroupMessages(state, groupId, messages);
}

const updateGroupMessages = (state, groupId, payload) => {
  const group = has(state, groupId) ? state[groupId] : {};
  console.log(group)
  return {
    ...state,
    // Update our Post object with a new "messages" array
    [groupId]: {
      ...group,
      messages: group.messages.concat(payload)
    }
  };
};

export const fillList = (state, action) => {
  const { payload } = action;
  const { count, byId, allIds } = payload;
  
  return {
    ...byId,
  };
};

function groupsById(state = {}, action) {
  switch (action.type) {
    case types.SET_MESSAGES:
      return addMultipleMessages(state, action);
    case types.ADD_GROUPS:
      return fillList(state, action);
    case types.ADD_MESSAGE:
      return addMessage(state, action);
    default:
      return state;
  }
}

function addGroupId(state, action) {
  const { payload } = action;
  const { allIds } = payload;
  // Just append the new Message's ID to the list of all IDs
  return allIds;
}

function allGroups(state = [], action) {
  switch (action.type) {
    case types.ADD_GROUPS:
      return addGroupId(state, action);
    default:
      return state;
  }
}

const groupsReducer = combineReducers({
  byId: groupsById,
  allIds: allGroups
});

// reducers/messages.js
export const fillMessages = (state, action) => {
  const { payload } = action;
  const { count, byId, allIds } = payload;
  
  return {
    ...byId,
  };
};

function addMessageEntry(state, action) {
  const { payload } = action;
  const { message } = payload;

  // Create our new Message object
  

  // Insert the new Message object into the updated lookup table
  return {
    ...state,
    [message.id]: message
  };
}

function messagesById(state = {}, action) {
  switch (action.type) {
    case types.SET_MESSAGES:
      return fillMessages(state, action);
    case types.ADD_MESSAGE:
      return addMessageEntry(state, action);
    default:
      return state;
  }
}

function addMessageId(state, action) {
  const { payload } = action;
  const { messageId } = payload;
  // Just append the new Message's ID to the list of all IDs
  return state.concat(messageId);
}

function addMessageIds(state, action) {
  const { payload } = action;
  const { allIds } = payload;
  // Just append the new Message's ID to the list of all IDs
  return allIds;
}

function allMessages(state = [], action) {
  switch (action.type) {
    case types.SET_MESSAGES:
      return addMessageIds(state, action);
    case types.ADD_MESSAGE:
      return addMessageId(state, action);
    default:
      return state;
  }
}

const messagesReducer = combineReducers({
  byId: messagesById,
  allIds: allMessages
});

export default combineReducers({
  groups: groupsReducer,
  messages: messagesReducer
});

export const getMessages = (state, selected) => {
  
  if (state.groups.allIds.includes(selected)) return [];
  
  const group = state.groups.byId[selected];
  
  if (has(group, 'messages')) {
    return group.messages.map((id) => {
      return state.messages.byId[id]
    })
  }
  
  return []
};
