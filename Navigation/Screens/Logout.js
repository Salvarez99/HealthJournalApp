// welcome.js to logout.js if user clicks botom nav bar 
/**
 * citation to learned about navbar.  https://www.geeksforgeeks.org/how-to-create-material-bottom-tab-navigator-in-react-native/
 * 
 */
import React from "react"; 
import { Ionicons } from "@expo/vector-icons";  // use use icon from expo 
import { StatusBar } from 'expo-status-bar';

import {
    StyledContainer,
    InnerContainer,
    
    PageTitle,
    SubTitle,
    StyledFormArea,
  
    // for button 
    StyledButton,
    ButtonText,

    // for welcome.js 
    WelcomePageContainer,
    Avatar,
    WelcomePageImage,
    //for welcome.js avartar
    TopContainer,

    // for Bottom nav bar 
    BottomNavBarContainer,

}from '../../AppStyles/styles';;
import { Button, View, Image, Text, TouchableOpacity } from 'react-native';

//for navigation
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

// create cont function 
const Logout = () =>{
    // init navigation hook.
   const navigation = useNavigation(state=>state);  // go to state

    //return statement 
    return(
       <StyledContainer>
        <StatusBar style="dark" />
        <TopContainer>
            <Image
                style={{ width: '100%', height: '100%' }}
                source={require('../../assets/welcomeBackground.jpg')}
                resizeMode="cover"
            />
        </TopContainer>

        <InnerContainer>
            <WelcomePageContainer>
            <PageTitle welcome={true}><Text>Logged Out!</Text></PageTitle>
            <SubTitle welcome={true}><Text>You're in Control!</Text></SubTitle>
            <SubTitle welcome={true}><Text>Keep up to date on how you're doing by secured healthy journaling app.</Text></SubTitle>
            <SubTitle welcome={true}><Text>The information is encrypted and you can stop sharing at any time.</Text></SubTitle>
 
                <StyledFormArea>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Avatar resizeMode="cover" source={require('../../assets/login_page.png')} />
                    </View>

                    <StyledButton onPress={() => navigation.navigate('Login')}>
                        <ButtonText> Logout</ButtonText>
                    </StyledButton>
                </StyledFormArea>
            </WelcomePageContainer>
            
        </InnerContainer>
       

    </StyledContainer>

    );
};


//default 
export default Logout; // use.js name 