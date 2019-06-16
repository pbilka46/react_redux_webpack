import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import appState from './store';

import App from './components/App';
import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: '9e1c438b81f8b5911b2a',
  cluster: 'eu',
  encrypted: true
});

ReactDOM.render(
  <Provider store={appState.store}>
    <PersistGate persistor={appState.persistor}>
      <App />
    </PersistGate>
  </Provider>,
document.getElementById("root"));
