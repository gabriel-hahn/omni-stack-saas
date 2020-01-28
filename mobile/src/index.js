import React from 'react';
import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo';

import '~/config/StatusBarConfig';

import store from './store';
import App from './App';

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default registerRootComponent(Root);
