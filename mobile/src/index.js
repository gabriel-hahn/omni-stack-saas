import React from 'react';
import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo';

import '~/config/StatusBarConfig';

import Routes from './routes';
import store from './store';

const Root = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

export default registerRootComponent(Root);
