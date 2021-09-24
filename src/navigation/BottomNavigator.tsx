import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from 'screens/Dashboard';
import CustomerNavigator from './CustomerNavigator';
import Work from 'screens/Work';
import Me from 'screens/Me';
import DashboardNavigator from './DashboardNavigator';

export type PrimaryParamList = {
  dashboard: undefined;
  customer: undefined;
  work: undefined;
  me: undefined;
};

const Tab = createBottomTabNavigator<PrimaryParamList>();

export function BottomNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true
      }}
    >
      <Tab.Screen name="dashboard" component={DashboardNavigator} />
      <Tab.Screen name="customer" component={CustomerNavigator} />
      <Tab.Screen name="work" component={Work} />
      <Tab.Screen name="me" component={Me} />
    </Tab.Navigator>
  );
}
