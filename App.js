import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AddUserScreen from './screens/AddUserScreen';
import UserScreen from './screens/UserScreen';
import UserDetailScreen from './screens/UserDetailScreen';

import {decode, encode} from 'base-64';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#621FF7',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="UserScreen"
        component={UserScreen}
        options={{title: 'Cards List'}}
      />
      <Stack.Screen
        name="AddUserScreen"
        component={AddUserScreen}
        options={{title: 'Add Card'}}
      />
      <Stack.Screen
        name="UserDetailScreen"
        component={UserDetailScreen}
        options={{title: 'Card Detail'}}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
console.disableYellowBox = true;
