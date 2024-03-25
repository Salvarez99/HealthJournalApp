import React from "react"; 
import { Text, View } from "react-native"; 
import { Ionicons } from "@expo/vector-icons";  // use use icon from expo 
import { StatusBar } from 'expo-status-bar';

import {StyledContainer,
    InnerContainer,
}from './../components/styles.js';


// create cont function 
const MedicationListing = () =>{
    //return statement 
    return(
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                        {/* Render text inside a Text component */}
        <Text> This is Meidcation isting Page </Text>
            </InnerContainer>
        </StyledContainer>
        
    );
};


//default 
export default MedicationListing; // use.js name 