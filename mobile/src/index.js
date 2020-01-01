import React from 'react';
import { registerRootComponent } from 'expo';

import '~/config/StatusBarConfig';

import Routes from './routes';

const Root = () => <Routes />;

export default registerRootComponent(Root);
