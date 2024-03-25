import * as React from 'react';
import { StatusBar } from 'expo-status-bar';

import {
    StyledContainer,
    // for Bottom nav bar 
    BottomNavBarContainer,

}from '../../Components/styles';
import { Button, View, Image, Text, TouchableOpacity } from 'react-native';

//for navigation
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

// import BottomNavBar.js from components
import BottomNavBar from '../../Components/BottomNavBar';
import { Ionicons } from '@expo/vector-icons'



import { NavigationContainer } from '@react-navigation/native';
import MainContainer from './../MainContainer'; // Import MainContainer component



// handle Welcome
const Welcome = () => {
    
     // init navigation hook.
  // const navigation = useNavigation(state=>state);  // go to state


   return (
    <NavigationContainer>
    {/* Use the MainContainer component */}
    <MainContainer />
  </NavigationContainer>

    );
};

export default Welcome;