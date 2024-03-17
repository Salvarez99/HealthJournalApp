import * as React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'

import JournalScreen from './Screens/JournalScreen';
import CalendarScreen from './Screens/CalendarScreen';
import MedicationScreen from './Screens/MedicationScreen';

//Screen Names
const journalName = 'Journal';
const calendarName = 'Calendar';
const medicationName = 'Medication';

const Tab = createBottomTabNavigator();

export default function MainContainer(){
    return(
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName={journalName}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) =>{
                    let iconName;
                    let rn = route.name;

                    if(rn === journalName){
                        iconName = focused ? 'book' : 'book-outline'
                    }else if(rn === calendarName){
                        iconName = focused ? 'calendar' : 'calendar-outline'
                    }else if(rn === medicationName){
                        iconName = focused ? 'medical' : 'medical-outline'
                    }

                    return <Ionicons name = {iconName}  size={size} color={color}/>
                },

                tabBarActiveTintColor: "lightblue",
                tabBarInactiveTintColor: "blue",
                tabBarLabelStyle: {
                  paddingBottom: 3,
                  fontSize: 10,
                },
                tabBarStyle:{
                    display: "flex",
                    
              },
            })}
            >

            <Tab.Screen name = {journalName} component={JournalScreen}/>
            <Tab.Screen name = {calendarName} component={CalendarScreen}/>
            <Tab.Screen name = {medicationName} component={MedicationScreen}/>

            </Tab.Navigator>
        </NavigationContainer>
    );
}