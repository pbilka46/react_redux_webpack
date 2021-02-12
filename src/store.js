import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import reducer from './reducers';
// const callAPIMiddleware = ({ dispatch, getState }) => {
//   return next => action => {
//     const { types, callAPI, payload = {} } = action;
//
//     if (!types) {
//       // Normal action: pass it on
//       return next(action)
//     }
//
//     if (
//       !Array.isArray(types) ||
//       types.length !== 3 ||
//       !types.every(type => typeof type === 'string')
//     ) {
//       throw new Error('Expected an array of three string types.')
//     }
//
//     if (typeof callAPI !== 'function') {
//       throw new Error('Expected callAPI to be a function.')
//     }
//
//     const [requestType, successType, failureType] = types;
//
//     dispatch(
//       Object.assign({}, payload, {
//         type: requestType
//       })
//     );
//
//     return callAPI().then(
//       response =>
//         dispatch(
//           Object.assign({}, payload, {
//             response,
//             type: successType
//           })
//         ),
//       error =>
//         dispatch(
//           Object.assign({}, payload, {
//             error,
//             type: failureType
//           })
//         )
//     )
//   }
// };
const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const configureStore = composeEnhancers(applyMiddleware(...middleware))(createStore);

const config = {
  key: 'root',
  storage,
  whitelist: ['account'],
};

const combinedReducer = persistReducer(config, reducer);
const createAppStore = () => {
  const store = configureStore(combinedReducer);
  const persistor = persistStore(store);
  return { persistor, store };
};

export default createAppStore();


