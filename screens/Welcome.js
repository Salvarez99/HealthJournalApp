import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';

import {
    StyledContainer,
    // for Bottom nav bar 
    BottomNavBarContainer,

}from './../components/styles';
import { Button, View, Image, Text, TouchableOpacity } from 'react-native';

//for navigation
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

// import BottomNavBar.js from components
import BottomNavBar from '../components/BottomNavBar';
import { Ionicons } from '@expo/vector-icons'


// handle Welcome
const Welcome = () => {
    
     // init navigation hook.
  // const navigation = useNavigation(state=>state);  // go to state


   return (
    <StyledContainer>
        <StatusBar style="dark" />
        <BottomNavBarContainer>
                <BottomNavBar />
        </BottomNavBarContainer>
        
        
      
    </StyledContainer>

    );
};

export default Welcome;