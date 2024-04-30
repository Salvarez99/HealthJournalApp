import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainContainer from "./Navigation/MainContainer";
import Login from "./Navigation/Screens/Login";
import SignUp from "./Navigation/Screens/Signup";
//import Logout from './Navigation/Screens/Logout';
import JournalTitle from "./Navigation/Screens/JournalTitle";
import Toast from "react-native-toast-message";

import SettingPage from "./Navigation/Screens/SettingPage";
import AccountSetting from "./Navigation/Screens/AccountSetting";
import StorageSetting from "./Navigation/Screens/StorageSetting";
import ChangePasswordScreen from "./Navigation/Screens/ChangePasswordScreen";

const Stack = createStackNavigator();




export default function App() {
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
