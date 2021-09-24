import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAppSelector } from 'common/hooks/store';
import Login from 'screens/Auth/Login';

const Stack = createStackNavigator();

const Navigation: React.VFC = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {user ? (
          <React.Fragment></React.Fragment>
        ) : (
          <React.Fragment>
            <Stack.Screen name="NoAuth" component={Login} />
          </React.Fragment>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
