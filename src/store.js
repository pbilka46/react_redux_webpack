import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import reducer from './reducers';

const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const configureStore = composeEnhancers(applyMiddleware(...middleware))(createStore);

const config = {
  key: 'root',
  storage,
  whitelist: ['account']
};

const combinedReducer = persistReducer(config, reducer);
const createAppStore = () => {
  const store = configureStore(combinedReducer);
  const persistor = persistStore(store);
  return { persistor, store };
};

export default createAppStore();
