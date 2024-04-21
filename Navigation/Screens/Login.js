import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { FIREBASE_AUTH } from '../../firebaseConfig';
//import {GoogleSignIn} from '@react-native-google-signin/google-signin';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth';
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

}from '../../AppStyles/styles';
import { Button, View } from 'react-native';

// icon
import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons'; // Ionicons : for isPassword , Fontisto : for goole icon

//for navigation
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook


//colors
const { brand, darkLight, primary } = Colors;


export default function Login(){
    // init navigation hook.
    const navigation = useNavigation(); 
    const auth = FIREBASE_AUTH;
    // use Usestate hook for pasword 
    const [hidePassword, setHidePassword] = useState(true); //default is true
    //const[email, setEmail] = useState('');
    //const[password, setPassword] = useState('');


    const handleLogin = async({email, password}) => {
       
        
        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            navigation.navigate('MainContainer');
            console.log("Logging in successful! ", user);
        }
        catch(error){
            console.log(email);
            console.log(password);
            console.log("Error Logging in", error.message);
        }
      };

      const handleGoogleLogin = async({}) => {


      }


      // most of container components are defined in style.js
    return(
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageLogo resizeMode ="cover" source={require('../../assets/login_page.png')}/>
                <PageTitle>Health Journaling App</PageTitle>
                <SubTitle>Account Login</SubTitle>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={handleLogin}
                >
                
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <StyledFormArea>
                            <MyTextInput
                                required
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
                                required
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
                            <StyledButton onPress={handleSubmit}>
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

// export default Login; 