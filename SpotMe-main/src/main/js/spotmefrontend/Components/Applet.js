import React from 'react';
import {
  StyleSheet,
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './Login';
import RegisterScreen from './Register';
import ChatScreen from './Chat';
import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

const Applet = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator >
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name='Chat' component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Applet;