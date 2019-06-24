import has from 'lodash/has';
import createReducer from './createReducer';
import * as types from '../constants/actionTypes';


const addMessage = (state, action) => {
  const { group_id } = action.payload;

  const array = has(state, group_id) ? state[group_id] : [];

  array.push(action.payload);

  return {
    ...state,
    [group_id]: [...array],
  };
};

const select = (state, action) => ({
  ...state,
  selected: action.payload.id,
});

const createMessages = () => createReducer(
  { selected: null },
  {
    [types.ADD_MESSAGE]: addMessage,
    [types.SELECT]: select,
  },
);

export default createMessages;

// Selectors API

export const getSelectedGroup = state => state.selected;
export const getMessagesByGroupId = (state, groupId) => (has(state, groupId) ? state[groupId] : []);
export const getAllEntities = state => state.allIds.map(id => state.byId[id]);
export const getEntityById = (state, id) => state.byId[id];
export const getEntitiesIds = state => state.allIds;
export const getEntitiesLength = state => state.count;
