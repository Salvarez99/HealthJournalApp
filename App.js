import React from 'react';
// for navigating between .js files 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native'; // React is not needed here
import Login from './screens/Login.js'; // Import Login component
import Signup from './screens/Signup.js'; // Import Signup component
import Welcome from './screens/Welcome.js';

import CalendarScreen from './screens/Calendar.js';
import JournalListing from './screens/JournalListing.js';
import MedicationListing from './screens/MedicationListing.js'; 
import Logout from './screens/Logout.js'; 
//bottom nav bar componenet 
import BottomNavBar from './components/BottomNavBar.js';



const Stack = createStackNavigator(); // for navigator


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
            
              <Stack.Screen name="CalendarScreen" component={CalendarScreen}/>
              <Stack.Screen name="JournalListing" component={JournalListing}/>
              <Stack.Screen name="MedicationListing" component={MedicationListing}/>
              <Stack.Screen name="Logout" component={Logout} /> 


        </Stack.Navigator>
        {/** Since i want to display bottom nav bar from welcome.js screen call BottomNavBar outside of stack.navigator */}
       
        
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

