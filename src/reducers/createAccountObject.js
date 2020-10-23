import createReducer from './createReducer';

const fill = (state, action) => ({
  ...state,
  isAuth: true,
  ...action.payload,
});

const createAccountObject = name => createReducer({ isAuth: false }, {
  [`${name}_FILL`]: fill,
});

export default createAccountObject;
