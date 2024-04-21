import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
// citation learned from : https://www.youtube.com/watch?v=BQ-kHwLlhrg

// import formik
import { Formik } from 'formik';

import {
    StyledContainer,
    InnerContainer,
    PageLogo, 
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon, 
    RightIcon,
    StyledInputLabel, 
    StyledTextInput,
    Colors,
    // for button 
    StyledButton,
    ButtonText,
    //message box and line 
    MsgBox, 
    Line,
    // import for text  view and link styles 
    StyleView, 
    StyleText, 
    LinkText, 
    ContentOfLinkText,

}from './../components/styles';
import { Button, View } from 'react-native';

// icon
import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons'; // Ionicons : for isPassword , Fontisto : for goole icon

//for navigation
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook


//colors
const { brand, darkLight, primary } = Colors;

// handle login 
const Login = () => {
    // init navigation hook.
    const navigation = useNavigation(); 

    // use Usestate hook for pasword 
    const [hidePassword, setHidePassword] = useState(true); //default is true

    const handleLogin = () => {
        navigation.navigate('Welcome');
      };


      // most of container components are defined in style.js
    return(
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageLogo resizeMode ="cover" source={require('./../assets/img/login_page.png')}/>
                <PageTitle>Health Journaling App</PageTitle>
                <SubTitle>Account Login</SubTitle>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={(values) => {
                        console.log(values);
                        // change screen from login.js to welcome.js 
                       navigation.navigate('Welcome');
                    }}
                >
                
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <StyledFormArea>
                            <MyTextInput
                                label="Email Address"
                                icon="mail"
                                placeholder="welcome@gmail.com"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                            />
                            <MyTextInput
                                label="Password"
                                icon="lock"
                                placeholder="Enter Password"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                //keyboardType="email-address"
                                // hide password while user typing for security purpose 
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword = {setHidePassword}
                            />
                            <MsgBox>...</MsgBox>
                            <StyledButton onPress={handleLogin}>
                                <ButtonText> Login </ButtonText>
                            </StyledButton>
                            <Line />

                            <StyledButton google={true} onPress={handleSubmit}>
                                <Fontisto name="google" color ={primary} size={20}/>
                                <ButtonText google={true}> 
                                    Sign in with Google
                                </ButtonText>
                            </StyledButton>

                            <StyleView>
                                <StyleText>Don't have an account yet? </StyleText>
                                {/*Change screen from login.js to Signup.js when user click button */}
                                <LinkText onPress={() => navigation.navigate('Signup')}>
                                    <ContentOfLinkText>Signup</ContentOfLinkText>
                                </LinkText>
                            
                            </StyleView>

                            
                         
                            

                        </StyledFormArea>
                    )}
                </Formik>
            </InnerContainer>
        </StyledContainer>
    );
};


// MyTextInput component
const MyTextInput = ({ label, icon,isPassword,hidePassword, setHidePassword, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={()=> setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={30} color={darkLight} />
                </RightIcon>

            )}
            
        </View>
    );
};

export default Login; 