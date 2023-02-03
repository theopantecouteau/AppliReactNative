import { AppRegistry } from 'react-native';
import React from 'react';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { RootSiblingParent } from 'react-native-root-siblings';

import configureStore from './src/app/store';
import {getUserData} from "./src/actions/users";

const store = configureStore()

export const RNRedux = () => (
    <Provider store={store}>
        <RootSiblingParent>
            <App/>
        </RootSiblingParent>
    </Provider>
)
AppRegistry.registerComponent('main', () => RNRedux );
