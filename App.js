import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainContainer from "./Navigation/MainContainer";
import Login from "./Navigation/Screens/Login";
import SignUp from "./Navigation/Screens/Signup";
//import Logout from './Navigation/Screens/Logout';
import JournalTitle from "./Navigation/Screens/JournalTitle";


// for setting 
import SettingButton from './Components/SettingButton';
import SettingPage from './Navigation/Screens/SettingPage';
import AccountSetting from './Navigation/Screens/AccountSetting';
import StorageSetting from './Navigation/Screens/StorageSetting';
import ChangePasswordScreen from './Navigation/Screens/ChangePasswordScreen';

import { useRef, useEffect, useState } from 'react';
import { AppState } from 'react-native';
import { openData, closeData } from "./LocalStorage/LocalDatabase";


const Stack = createStackNavigator();

export default function App() {

  let appStateSubscription = null;
const [appState, setAppState] = useState(AppState.currentState);

useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
        if (appState.match(/inactive|background/) && nextAppState === 'active') {
            // App has come to the foreground
            openData(); // Reopen the database
        } else if (appState === 'active' && nextAppState.match(/inactive|background/)) {
            // App has gone to the background
            closeData(); // Close the database
        }
        setAppState(nextAppState);
    };

    appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
        if (appStateSubscription) {
            appStateSubscription.remove();
        }
        // Close the database when the app is being destroyed
        closeData();
    };
}, []); // Removed appState from the dependency array

// Add console log to check if appState is changing
useEffect(() => {
    console.log('App state changed:', appState);
}, [appState]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainContainer"
          component={MainContainer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignUp}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="JournalTitle"
          component={JournalTitle}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="SettingPage"
          component={SettingPage}
          options={{ headerShown: true,  headerTitle : 'Settings'}}
        />

        <Stack.Screen
          name="AccountSetting"
          component={AccountSetting}
          options={{ headerShown: true, headerTitle : 'Account Setting' }}
        />

        <Stack.Screen
          name="StorageSetting"
          component={StorageSetting}
          options={{ headerShown: true, headerTitle : 'Storage Settings' }}
        />

        <Stack.Screen
          name="ChangePasswordScreen"
          component={ChangePasswordScreen}
          options={{ headerShown: false }}
        />
      

      </Stack.Navigator>
    </NavigationContainer>
  );
}
