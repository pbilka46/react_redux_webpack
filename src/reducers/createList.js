import createReducer from './createReducer';

const initialState = {
  count: 0,
  byId: {},
  allIds: [],
};

/**
 * Substitutes list with completely new elements
 * @param state
 * @param action
 * @returns {{count: *, byId: *, allIds: *}}
 */
export const fillList = (state, action) => {
  const { payload } = action;
  const { count, byId, allIds } = payload;

  return {
    ...state,
    count,
    byId,
    allIds,
  };
};

const addElement = (state, action) =>  {

}

const createList = (name, optionalInitialState) => createReducer(
  optionalInitialState || initialState,
  {
    [`${name}_LIST`]: fillList,
    [`${name}_LIST_ADD`]: addElement
  }
);

export default createList;

// Selectors API

export const getAllEntities = state => state.allIds.map(id => state.byId[id]);
export const getEntityById = (state, id) => state.byId[id];
export const getEntitiesIds = state => state.allIds;
export const getEntitiesLength = state => state.count;
