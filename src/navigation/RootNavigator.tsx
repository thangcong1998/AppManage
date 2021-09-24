import React from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {BottomNavigator} from './BottomNavigator';
import {color} from '../theme';
import {NoAuthNavigator} from './NoAuthNavigator';
import { useAppSelector } from 'common/hooks/store';

export type RootParamList = {
  BottomNav: undefined;
  noAuth: undefined;
};

const Stack = createStackNavigator<RootParamList>();

const RootStack = () => {
  const user = useAppSelector(state => state.auth.user);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {user ? (
        <Stack.Screen
          name="BottomNav"
          component={BottomNavigator}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <Stack.Screen
          name="noAuth"
          component={NoAuthNavigator}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack.Navigator>
  );
};

export const RootNavigator = React.forwardRef<
  NavigationContainerRef,
  Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
  return (
    <NavigationContainer {...props} ref={ref}>
      <RootStack />
    </NavigationContainer>
  );
});

RootNavigator.displayName = 'RootNavigator';
