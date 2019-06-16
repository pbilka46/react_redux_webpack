import createReducer from './createReducer';
const fill = (state, action) => {
  return {
    ...state,
    ...action.payload
  }
};

const createObject = (name) => createReducer({}, {
  [`${name}_FILL`]: fill
});

export default createObject;
