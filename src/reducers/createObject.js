import createReducer from './createReducer';

const fill = (state, action) => ({
  ...state,
  isAuth: true,
  ...action.payload,
});

const createObject = name => createReducer({ isAuth: false }, {
  [`${name}_FILL`]: fill,
});

export default createObject;
