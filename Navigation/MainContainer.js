import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Platform } from "react-native";

// toi link journalscreen.js with journaltitle.js
import { createStackNavigator } from "@react-navigation/stack";

import JournalScreen from "./Screens/JournalScreen";
import CalendarScreen from "./Screens/CalendarScreen";
import MedicationScreen from "./Screens/MedicationScreen";
import { TouchableOpacity } from "react-native-gesture-handler";
//import JournalTitle from './Screens/JournalTitle';

//Screen Names
const journalName = "Journal";
const calendarName = "Calendar";
const medicationName = "Medication";

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  const tabBarHeight = Platform.OS === "ios" ? "12%" : "7%";

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
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => console.log("Add Event")}
              style={{ marginRight: 10 }}
            >
              <Ionicons name="settings-outline" size={30} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name={calendarName}
        component={CalendarScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => console.log("Add Event")}
              style={{ marginRight: 10 }}
            >
              <Ionicons name="settings-outline" size={30} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name={medicationName}
        component={MedicationScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => console.log("Add Event")}
              style={{ marginRight: 10 }}
            >
              <Ionicons name="settings-outline" size={30} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
