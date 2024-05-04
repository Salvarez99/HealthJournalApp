// create bottom nav bar that contains 3 button ( calendar, journal, medication) >> import on welcome.js to use it 
/**
 * Citation 
 * https://reactnavigation.org/docs/bottom-tab-navigator/
 * npm install @react-navigation/bottom-tabs
 */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';  // to use bottom-tabs


import React from 'react';
import { useNavigation } from '@react-navigation/native';


// for bottom 3 icons and connect to journalList.js , Calendar.js , and MedicationListing.js 
import { Ionicons } from "@expo/vector-icons"; 
// citation for learned materialbottom tab navigator 
// https://reactnavigation.org/docs/3.x/material-bottom-tab-navigator/#:~:text=A%20material%2Ddesign%20themed%20tab,until%20they%20are%20first%20focused.&text=This%20API%20also%20requires%20that,%2Dnative%2Dvector%2Dicons%20!
import { createMaterialBottomTabNavigator } from  "react-navigation-material-bottom-tabs";  // do npm install before imporintg
import { createAppContainer } from "react-navigation"; 

// Import necessary screens
import JournalListing from '../screens/JournalListing';
import CalendarScreen from '../screens/Calendar';  // import const component name from .js file location 
import MedicationListing from '../screens/MedicationListing';
// for logout 
import Logout from '../screens/Logout'; 

import { Button, View, Image, Text } from 'react-native';

// Import styling
import { BottomNavBarContainer, Colors}  from './styles'; 

import { ScrollView } from 'react-native';

// define NavBarIcon  Ionicons componenets to use for calenedar icon, journalisting icon and medicationlisting icon
const NavBarIcon = ({focused, name, size, color}) =>{ //use arrow function with parameter.
    // use Ionicons from expo 
    <Ionicons 
        name = {focused ? name: "outline"} // if focused yes then name else outline.
        size={size} // take parameter and set it.
        color={color}
    />
}; 


// includes 3icons and link with those 3 .js screens / using  matieral bottom tab navigation 
// create bottom tab navigator 
const NavBar = createMaterialBottomTabNavigator(
    {
        //create calendar.
        Calendar : {
            screen : CalendarScreen, // use Calender.js >> CalendarScreen component.
            navigationOptions : {
                tabBarLabel : "Calendar", // name to be display on bar
                tabBarIcon : ({focused, tintColor}) =>( // pass 2 parameter for tabBarIcon 
                    // call NavBarIcon component 
                    <NavBarIcon focused={focused} name = "calendar" size={45} color={tintColor} />
                ),
            },
        },

        //creact journallisting 
        JournalListing : {
            screen : JournalListing, 
            navigationOptions : {
                tabBarLabel : "Journal", // name 
                tabBarIcon : ({focused, tintColor}) =>(
                    <NavBarIcon focused={focused} name = "journal" size={45} color={tintColor} />
                ),
            },
        },


        //create medication listing 
        MedicationListing: {
            screen: MedicationListing,
            navigationOptions: {
                tabBarLabel: "Medication",
                tabBarIcon: ({ focused, color }) => (
                    <NavBarIcon focused={focused} name="medical" size={26} color={color} />
                ),
            },
        },

        //create for log out 
        Logout: {
            screen: Logout,
            navigationOptions: {
                tabBarLabel: "Logout", // this logout button will take user back to login page. 
                tabBarIcon: ({ focused, color }) => (
                    <NavBarIcon focused={focused} name="medical" size={26} color={color} />
                ),
            },
        },
    },
    {
        initialRouteName: null, // initialRouteName to null
        barStyle: { backgroundColor: Colors.ligthBrown},  // bottom navigation bar backgound color - defined with barStyle.
      }, 
);

// create naviagtor using createAppcontainer 
const Navigator = createAppContainer(NavBar); 

// create const 
const BottomNavBar = () => {
    return (
        <BottomNavBarContainer>
        <Navigator />
        </BottomNavBarContainer>
    ); 
}

//export default 
export default BottomNavBar; 