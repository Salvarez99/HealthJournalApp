// welcome.js to JournalListing.js if user clicks botom nav bar 
/**
 * citation to learned about navbar.  https://www.geeksforgeeks.org/how-to-create-material-bottom-tab-navigator-in-react-native/
 * 
 */
import React from "react"; 
import { Text, View } from "react-native"; 
import { Ionicons } from "@expo/vector-icons";  // use use icon from expo 
import { StatusBar } from 'expo-status-bar';

import {StyledContainer,
    InnerContainer,
}from '../../Components/styles.js';


// create cont function 
const JournalListing = () =>{
    //return statement 
    return(
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                        {/* Render text inside a Text component */}
        <Text> This is journal Listing Page </Text>
            </InnerContainer>
        </StyledContainer>
        
    );
};


//default 
export default JournalListing; // use.js name 