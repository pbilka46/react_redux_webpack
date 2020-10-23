import axios from 'axios';
import { API_URL } from '../env';
import * as types from '../constants/actionTypes';
import { getSelectedGroup } from '../reducers';

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
  const id = Number(current.id);
  accumulator[id] = current;
  return accumulator;
}, {});


export const setListFromArray = (array) => {
  // const listArray = attachIds(array);
  const byId = getNormalizedListShape(array);

  return {
    byId,
    allIds: Object.keys(byId),
    count: array.length,
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
  const url = `${API_URL}/auth/signup/`;

  return axios({
    url,
    data,
    method: 'post',
  }).then(
  );
};

const setGroupsList = payload => ({
    type: 'GROUPS_LIST_FILL',
    payload
  });

export const attachIds = results => results
  .map((result, index) => ({ ...result, entityId: index }));

const setList = makeActionCreator(
  createNamedType('ADD', 'GROUPS'),
  'payload',
);


const createList = (results) => {
  const arr = attachIds(results);

  return getNormalizedListShape(arr);
};

const createMessage = (message, userId) => ({
  ...message,
  belongs_to_user: userId === message.user_id
});


export const createGroupAction = data => (dispatch, getState) => {
  const url = `${API_URL}/groups/create/`;
  const { token } = getState().account;
  return axios({
    url,
    data,
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(
  );
};

export const logout = () => ({ type: 'LOGOUT' });


export const getGroups = () => (dispatch, getState) => {
  const url = `${API_URL}/groups/`;
  const { token } = getState().account;
  return axios({
    url,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(
    (res) => {
      dispatch(setGroupsList(setListFromArray(res.data)));
    },
  );
};

export const sendMessage = message => (dispatch, getState) => {
  const store = getState();
  const { token } = store.account;
  const groupId = store.window.selectedGroup;
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
    },
  );
};

export const getUserGroups = () => (dispatch, getState) => {
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
      const allIds = [];
      const groups = data.map((group) => {
        allIds.push(group.id);
        return {
          ...group,
          messages: []
        };
      });

      const payload = setListFromArray(groups);

      dispatch({ type: types.ADD_GROUPS, payload });

      return groups;
    },
  );
};


export const getRecentMessages = groupId => (dispatch, getState) => {
  const store = getState();
  const { token, userId } = store.account;
  // const groupId = store.window.selectedGroup;
  const url = `${API_URL}/groups/${groupId}/messages`;


  return axios({
    url,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(
    (res) => {
      const { data } = res;
      const messages = data.map(elem => createMessage(elem, userId));
      const payload = setListFromArray(messages);

      dispatch({
        type: 'SET_MESSAGES',
        payload: {
          ...payload,
          groupId,
        }
      });
    },
  );
};


function addComment(groupId, message) {
  return {
    type: types.ADD_MESSAGE,
    payload: {
      groupId,
      message
    }
  };
}

export const subscribeGroup = group => (dispatch, getState) => {
  const { userId } = getState().account;
  window.Echo.channel(`laravel_database_group.${group.id}`)
    .listen('NewMessage', (msg) => {
      dispatch(addComment(group.id, createMessage(msg, userId)));
    });
};


export const unSubscribeGroup = groupId => (dispatch, getState) => {
  dispatch({ type: `UNSUB_${groupId}` });
  window.Echo.leave(`laravel_database_group.${groupId}`);
};


export const selectGroup = nextGroup => (dispatch, getState) => {
  const selectedGroupId = getSelectedGroup(getState().window);
  dispatch(unSubscribeGroup(selectedGroupId));

  return dispatch(getRecentMessages(nextGroup.id)).then(() => {
    dispatch({ type: 'SELECT', payload: nextGroup.id });
    dispatch(subscribeGroup(nextGroup));
  });
};


export const connectChat = () => dispatch => dispatch(getUserGroups())
  .then(groups => dispatch(selectGroup(groups[0])));
