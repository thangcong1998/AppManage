import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CustomerList, { customerOptions } from 'screens/Customer/CustomerList';
import { SCREEN_KEY } from './ScreenKey';

const CustomerStack = createStackNavigator();

const customers = [
  {
    name: SCREEN_KEY.CUSTOMER.INDEX,
    component: CustomerList,
    option: customerOptions
  }
];

const CustomerNavigator = () => {
  return (
    <CustomerStack.Navigator>
      {customers.map((child) => (
        <CustomerStack.Screen
          key={child.name}
          name={child.name}
          component={child.component}
          options={child.option}
        />
      ))}
    </CustomerStack.Navigator>
  );
};

export default CustomerNavigator;
