import * as React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Platform } from "react-native";

import JournalScreen from "./Screens/JournalScreen";
import CalendarScreen from "./Screens/CalendarScreen";
import MedicationScreen from "./Screens/MedicationScreen";

// for setting button
import SettingButton from "../Components/SettingButton";

//Screen Names
const journalName = "Journal";
const calendarName = "Calendar";
const medicationName = "Medication";

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  const tabBarHeight = Platform.OS === "ios" ? "12%" : "7%";

  // for adding setting button onto MainContainer (where it links to rest of all screens.) >> display setting buttons on the screens.
  // citation for header button ( setting button ) : https://reactnavigation.org/docs/header-buttons/
  const addSettingButton = ({ navigation }) => ({
    headerRight: () => <SettingButton navigation={navigation} />,
  });

  return (
    <Tab.Navigator
      initialRouteName={journalName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === journalName) {
            iconName = focused ? "book" : "book-outline";
          } else if (rn === calendarName) {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (rn === medicationName) {
            iconName = focused ? "medical" : "medical-outline";
          }

          return <Ionicons name={iconName} size={28} color={color} />;
        },
        tabBarActiveTintColor: "purple",
        tabBarInactiveTintColor: "#2c72a3",
        tabBarLabelStyle: {
          paddingBottom: 3,
          fontSize: 16,
        },
        tabBarStyle: {
          display: "flex",
          height: tabBarHeight,
        },
      })}
    >
      <Tab.Screen
        name={journalName}
        component={JournalScreen}
        options={addSettingButton}
      />
      <Tab.Screen
        name={calendarName}
        component={CalendarScreen}
        options={addSettingButton}
      />
      <Tab.Screen
        name={medicationName}
        component={MedicationScreen}
        options={addSettingButton}
      />
    </Tab.Navigator>
  );
}