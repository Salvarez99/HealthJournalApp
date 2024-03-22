import React from 'react';
// for navigating between .js files 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native'; // React is not needed here
import Login from './screens/Login.js'; // Import Login component
import Signup from './screens/Signup.js'; // Import Signup component
import Welcome from './screens/Welcome.js';


const Stack = createStackNavigator(); // for navigator
//Test comment 

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator 
        initialRouteName="Login"  // default  initial screen page 
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#FAF3E6' } // set background color
        }}
      >
      <Stack.Screen name="Login" component={Login} /> 
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Welcome" component={Welcome} />
    </Stack.Navigator>
    <StatusBar style="auto" />
  </NavigationContainer>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});