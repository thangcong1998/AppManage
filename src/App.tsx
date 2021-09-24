/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {Provider} from 'react-redux';
import {store} from './store';
import {getAuth} from 'store/authSlice';
import {useEffect} from 'react';
import {RootNavigator} from 'navigation/RootNavigator';
import {color} from 'theme';
import storage from 'common/storage';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    ...color,
  },
};

const App: () => Node = () => {
  const bootApp = () => {
    store.dispatch(getAuth());
  };
  useEffect(() => {
    bootApp();
  }, []);

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <RootNavigator />
      </PaperProvider>
    </Provider>
  );
};

export default App;
