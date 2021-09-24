import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../Dashboard';
import Customer from '../Customer';
import Work from '../Work';
import Me from '../Me';

const BottomTab = createBottomTabNavigator();

function Home() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="Dashboard" component={Dashboard} />
      <BottomTab.Screen name="Customer" component={Customer} />
      <BottomTab.Screen name="Work" component={Work} />
      <BottomTab.Screen name="Me" component={Me} />
    </BottomTab.Navigator>
  );
}

export default Home;
