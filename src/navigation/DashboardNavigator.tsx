import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Dashboard from 'screens/Dashboard';
import Commission, { commissionOptions } from 'screens/Dashboard/Commission';
import { NavigationContainer } from '@react-navigation/native';
import { SCREEN_KEY } from './ScreenKey';
import { dashboardOptions } from 'screens/Dashboard/Dashboard';
import Test from 'screens/Dashboard/Test/test';
import trangchu from 'screens/Dashboard/trangchu';
const DashboardStack = createStackNavigator();

const dashBoard = [
  {
    name: SCREEN_KEY.DASHBOARD.DASHBOARD,
    // component: Test,
    component: Dashboard,
    option: dashboardOptions
  },
  {
    name: SCREEN_KEY.DASHBOARD.COMMISSION,
    // component: Commission,
    component: Test,
    // component: trangchu,

    option: commissionOptions
  }
];
export default function DashboardNavigator({}) {
  return (
    <DashboardStack.Navigator initialRouteName={SCREEN_KEY.DASHBOARD.DASHBOARD}>
      {dashBoard.map((child) => (
        <DashboardStack.Screen
          key={child.name}
          name={child.name}
          component={child.component}
          options={child.option}
        />
      ))}
    </DashboardStack.Navigator>
  );
}
