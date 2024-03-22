import React, { useState, useContext } from 'react';
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

}from './../components/styles';
import { Button, View, Image, Text } from 'react-native';

//for navigation
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook


// handle Welcome
const Welcome = () => {
    
     // init navigation hook.
   const navigation = useNavigation(); 

   return (
    <StyledContainer>
        <StatusBar style="dark" />
        <TopContainer>
            <Image
                style={{ width: '100%', height: '100%' }}
                source={require('./../assets/img/welcomeBackground.jpg')}
                resizeMode="cover"
            />
        </TopContainer>

        <InnerContainer>
            <WelcomePageContainer>
                <PageTitle welcome={true}><Text>Welcome!</Text></PageTitle>
                <SubTitle welcome={true}><Text>You're in Control!</Text></SubTitle>
                <SubTitle welcome={true}><Text>Keep up to date on how you're doing by secured healthy journaling app.</Text></SubTitle>
                <SubTitle welcome={true}><Text>The information is encrypted and you can stop sharing at any time.</Text></SubTitle>

                <StyledFormArea>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Avatar resizeMode="cover" source={require('./../assets/img/login_page.png')} />
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

export default Welcome;