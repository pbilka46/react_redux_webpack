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

const base = (data) => () => {

}

export const signupAction = data => (dispatch) => {
  const url = `${API_URL}/auth/signup/`;

  return axios({
    url,
    data,
    method: 'post',
  }).then(
  );
};

const setGroupsList = (payload) => {
  console.log('payload', payload)
  return {
    type: 'GROUPS_LIST_FILL',
    payload
  }
};
export const attachIds = results => results.map((result, index) => ({ ...result, entityId: index }));

const setList = makeActionCreator(
  createNamedType('ADD', 'GROUPS'),
  'payload',
);


const createList = (results) => {
  let arr = attachIds(results);
  
  return getNormalizedListShape(arr)
}



export const createGroupAction = (data) => (dispatch, getState) => {
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
}

export const getGroups = () => {
  return (dispatch, getState) => {
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
        console.log(setListFromArray(res.data));
        dispatch(setGroupsList(setListFromArray(res.data)));
      },
    );
  }
}

export const logout = () => ({ type: 'LOGOUT' });

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

export const getRecentMessages = () => (dispatch, getState) => {
  const store = getState();
  const { token, userId } = store.account;
  const groupId = store.window.selectedGroup;
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


export const select = group => (dispatch, getState) => {
  dispatch({ type: 'SELECT', payload: group.id });
};

const createMessage = (message, userId) => ({
    ...message,
    belongs_to_user: userId === message.user_id
  });

export const subscribeGroup = group => (dispatch, getState) => {
  const { userId } = getState().account;
  console.log(group.id)
  window.Echo.channel(`laravel_database_group.${group.id}`)
    .listen('NewMessage', (msg) => {
      dispatch(addComment(group.id, createMessage(msg, userId)));
    });
};


export const unSubscribeGroup = group => (dispatch, getState) => {
  // dispatch({ type: 'SUBSCRIBE_GROUP', payload: group });
  window.Echo.leave(`laravel_database_group.${group.id}`);
};
