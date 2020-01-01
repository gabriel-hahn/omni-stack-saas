import React from 'react';
import { registerRootComponent } from 'expo';
import { View } from 'react-native';

import '~/config/StatusBarConfig';

const Root = () => <View />;

export default registerRootComponent(Root);
