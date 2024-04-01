import React, { useState, useContext, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
// citation learned from : https://www.youtube.com/watch?v=BQ-kHwLlhrg


// import formik
import { Formik } from 'formik';
import styled from 'styled-components/native';
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
 
import { Button, View, TouchableOpacity } from 'react-native';

// icon
import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons'; // Ionicons : for isPassword , Fontisto : for goole icon

//colors
const { brand, darkLight, primary } = Colors;

// Datetimepicker - need to be installed on terminal before using it. check out expo datetimepicker documentation.
import DateTimePicker from '@react-native-community/datetimepicker';

// import screenorientation 
import { ScreenOrientation } from 'expo';


//for navigation
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook



// handle Signup 
const Singup = () => {
   // init navigation hook.
   const navigation = useNavigation(); 

    // use Usestate hook for pasword 
    const [hidePassword, setHidePassword] = useState(true); //default is true
    const [show, setShow] = useState(false);// show for the datetimepicker
    const [date, setDate] = useState(new Date(2024, 12, 14));// set this date as default

    // variable to hold actural date of birth to be sent 
    const [dob, setDob] = useState();

    const onChange = (event, selectDate) => {
        const currentDate = selectDate || date; 
        setShow(false); 
        //set date as current date 
        setDate(currentDate); 
        setDob(currentDate); 
    }

    const showDatePicker = () => {
        setShow('date');
    };

    // end of declation variables. 

    
    // initially lock screen as portrait mode ( vertical)
    useEffect(() => {
        async function lockScreenOrientation() {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        }

        lockScreenOrientation(); //call function(potrait mode.)

        // when component is unmounted, unlock screen, let it as landscape mode. 
        return async () => {
            await ScreenOrientation.unlockAsync();
        };
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts


    const handleSignup = () => {
        navigation.navigate('Login');
      };


    return(
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageTitle>Health Journaling App</PageTitle>
                <SubTitle>Account Signup</SubTitle>

                {show && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        style={{
                        backgroundColor: 'yellow',
                  }}
                 />
               )}

                {/* Use Formik Library to manage form state and handle submission.  */}
                <Formik
                    initialValues={{ fullName: '',  email: '', dateOfBirth : '', password: '', confirmPassword : '', }}
                    onSubmit={(values) => {
                        console.log(values);
                        navigation.navigate('Login');
                    }} // declare properties in initialValues={}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <StyledFormArea>
                            <MyTextInput
                            // text input box for entering name 
                                label="Full Name"
                                icon="person"
                                placeholder="Seoyeon Choi"  // default value
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('fullName')}
                                onBlur={handleBlur('fullName')}
                                value={values.fullName}
                               
                            />

                            <MyTextInput
                            // input text box for entering email addres. 
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
                            // input text box for enterting date of birth 
                                label="Date of Birth"
                                icon="calendar"
                                placeholder="YYYY - MM - DD"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('dateOfBirth')}
                                onBlur={handleBlur('dateOfBirth')}
                                value={dob ? dob.toDateString() : ''} // if value is pass make dob to datestring else return empty string
                                isDate={true}
                                editable={false}
                                showDatePicker={showDatePicker}

                              
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
                                
                            <MyTextInput
                            // confirm password input textbox
                                label="Confirm Password"
                                icon="lock"
                                placeholder="Enter Password"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                                //keyboardType="email-address"
                                // hide password while user typing for security purpose 
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword = {setHidePassword}
                            />

                            
                            <MsgBox>...</MsgBox>
                            <StyledButton onPress={handleSubmit}>
                                    <ButtonText>Signup</ButtonText>
                            </StyledButton>
                            <Line />
                        
                            {/** display text and link to login page at the end of page. */}
                            <StyleView>
                                <StyleText>Already have an account? </StyleText>
                                {/*Change screen from signup.js t ologin.js when user click button */}
                                <LinkText onPress={() => navigation.navigate('Login')}>
                                    <ContentOfLinkText>Login</ContentOfLinkText>
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
const MyTextInput = ({ label, icon, isPassword,hidePassword, setHidePassword, isDate, showDatePicker, ...props }) => {
    // input parameteres. 
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            
            {/* Check. if isDate is true,use touchableopacity onpress for datepicker, else(false) display empty text box   */}
            {/**  */}
            {isDate && (
                <TouchableOpacity onPress={showDatePicker}>
                <StyledTextInput {...props} />
                </TouchableOpacity>
            )}
            {!isDate && <StyledTextInput {...props} />}


            {/* To hide password  */}
            {isPassword && (
                <RightIcon onPress={()=> setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={30} color={darkLight} />
                </RightIcon>

            )}
            
        </View>
    );
};

export default Singup;  // use .js name 