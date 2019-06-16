import { API_URL} from '../env';
import axios from 'axios';

function makeActionCreator(type, ...argNames) {
  console.log(...argNames)
  return function(...args) {
    const action = { type };
    argNames.forEach((arg, index) => {
      console.log(arg)
      console.log(index)
      action[argNames[index]] = args[index]
    });
    return action
  }
}

const createNamedType = (name, type) => {
  return `${name}_${type}`;
};

const setAccountData = makeActionCreator(
  createNamedType('user', 'FILL'),
  'payload'
);

export const loginAction = (data) => {
  return (dispatch) => {
    const url = `${API_URL}/auth/login/`;
    
    return axios({
      url,
      data,
      method: 'post'
    }).then(
      (res) => {
        const { access_token, expires_at, user_id } = res.data;
        
        dispatch(setAccountData({
          token: access_token,
          expiresAt: expires_at,
          userId: user_id,
        }));
      }
    )
  }
};

export const signupAction = (data) => {
  return (dispatch) => {
    const url = `${API_URL}/auth/login/`;
    
    return axios({
      url,
      data,
      method: 'post'
    }).then(
      (res) => console.log(res)
    )
  }
};
