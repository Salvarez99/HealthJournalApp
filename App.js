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
import { initializeDatabase, exportDb } from "./LocalStorage/LocalDatabase";
import * as SQLite from 'expo-sqlite';
import { openData, closeData } from "./LocalStorage/LocalDatabase";
import {useRef, useEffect, useState} from 'react';
import { AppState } from "react-native";
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import AddAppointmentForm from "./InputForms/AddAppointmentForm";
import JournalScreen from "./Navigation/Screens/JournalScreen";


const Stack = createStackNavigator();




export default function App() {
  useEffect(() =>{
    initializeDatabase();
  }, []);
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
          name="JournalScreen"
          component={JournalScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddAppointmentForm"
          component={AddAppointmentForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddJournalEntryForm"
          component={AddAppointmentForm}
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
          options={{ headerShown: true, headerTitle : 'Journal' }}
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
          options={{ headerShown: true,  headerTitle : 'Change Password' }}
        />
      

      </Stack.Navigator>
    </NavigationContainer>
  );
}
