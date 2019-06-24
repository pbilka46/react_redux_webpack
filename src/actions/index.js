import axios from 'axios';
import { API_URL } from '../env';
import {getSelectedGroup} from "../reducers";

function makeActionCreator(type, ...argNames) {
  return function (...args) {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
}

const createNamedType = (name, type) => `${name}_${type}`;

const setAccountData = makeActionCreator(
  createNamedType('user', 'FILL'),
  'payload',
);

export const getNormalizedListShape = array => array.reduce((accumulator, current) => {
  const id = Number(current.entityId);
  accumulator[id] = current;
  return accumulator;
}, {});

export const attachIds = results => results.map((result, index) => ({ ...result, entityId: index }));

const setList = makeActionCreator(
  createNamedType('groups', 'LIST'),
  'payload',
);

export const setListFromArray = (array) => {
  const listArray = attachIds(array);
  const byId = getNormalizedListShape(listArray);

  return {
    byId,
    allIds: Object.keys(byId),
    count: listArray.length,
  };
};

export const loginAction = data => (dispatch) => {
  const url = `${API_URL}/auth/login/`;

  return axios({
    url,
    data,
    method: 'post',
  }).then(
    (res) => {
      const { access_token: token, expires_at: expiresAt, user_id: userId } = res.data;

      dispatch(setAccountData({
        token,
        userId,
        expiresAt,
      }));
    },
  );
};

export const signupAction = data => (dispatch) => {
  const url = `${API_URL}/auth/login/`;

  return axios({
    url,
    data,
    method: 'post',
  }).then(
    res => console.log(res),
  );
};

export const getGroups = () => (dispatch, getState) => {
  const url = `${API_URL}/groups/user`;
  const { token } = getState().account;
  return axios({
    url,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(
    (res) => {
      const { data } = res;
      dispatch(setList(setListFromArray(data)));
    },
  );
};

export const sendMessage = (message) => (dispatch, getState) => {
  const store = getState();
  const { token } = store.account;
  const groupId = getSelectedGroup(store.messages);
  const url = `${API_URL}/groups/${groupId}/messages`;

  return axios({
    url,
    method: 'post',
    data: {
      body: message,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(
    (res) => {
      console.log(res)
    },
  );
};

export const select = group => (dispatch, getState) => {
  dispatch({ type: 'SELECT', payload: group });
};

export const subscribeGroup = group => (dispatch, getState) => {
  console.log(group);
  window.Echo.channel(`laravel_database_group.${group.id}`)
    .listen('NewMessage', (message) => {

      dispatch({ type: 'ADD_MESSAGE', payload: message });
    });
};

export const unSubscribeGroup = group => (dispatch, getState) => {
  // dispatch({ type: 'SUBSCRIBE_GROUP', payload: group });
  window.Echo.leave(`laravel_database_group.${group.id}`);
};

