import React from 'react';
import Login from 'screens/Auth/Login';
import {createStackNavigator} from '@react-navigation/stack';

export type PrimaryParamList = {
  login: undefined;
};

const Stack = createStackNavigator<PrimaryParamList>();

export function NoAuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="login"
        component={Login}
      />
    </Stack.Navigator>
  );
}
