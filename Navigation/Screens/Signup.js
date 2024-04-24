import React, { useState, useContext, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
// citation learned from : https://www.youtube.com/watch?v=BQ-kHwLlhrg

// import formik
import { Formik } from 'formik';
import styled from 'styled-components/native';
import { Platform, Button, View, StyleSheet, TouchableOpacity, Image, Text, TextInput } from 'react-native';

// icon
import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons'; // Ionicons : for isPassword , Fontisto : for goole icon
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
    const [date, setDate] = useState(new Date());// set this date as default

    // variable to hold actural date of birth to be sent 
    const [dob, setDob] = useState(''); //?

    const onChange = (event, selectDate) => {
        const currentDate = selectDate || date; 
        setShow(false); 
        //set date as current date 
        setDate(currentDate || date ); 
        setDob(currentDate); // ?
    }

    const showDatePicker = () => {  
        setShow(true);
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

    
    // MyTextInput component
    const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
      return (
          <View>
              <View style={{ left: '5%', top: '40%', position: 'absolute', zIndex: 1 }}>
                  <Octicons name={icon} size={30} color='#000080' />
              </View>
              <Text style={styles.TextInputLabel}>{label}</Text>
  
              <TextInput style={styles.textInputStyle} {...props} />
  
              {isPassword && (
                  <TouchableOpacity style={styles.righticonstyle} onPress={() => setHidePassword(!hidePassword)}>
                      <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={30} color='#9CA3AF' />
                  </TouchableOpacity>
              )}
          </View>
      );
  };

    return(
        <View style={styles.MainContainer}>
            <StatusBar style="dark" />
            <View style={styles.SmallerContainer}>
                <Text style={styles.Title}>Health Journaling App</Text>
                <Text style={styles.SubText}>Account Signup</Text>
            
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
                        <View style={{width: '85%'}}>
                            <MyTextInput
                            // text input box for entering name 
                                label="Full Name"
                                icon="person"
                                placeholder="Seoyeon Choi"  // default value
                                placeholderTextColor= '#9CA3AF'
                                onChangeText={handleChange('fullName')}
                                onBlur={handleBlur('fullName')}
                                value={values.fullName}
                               
                            />

                            <MyTextInput
                            // input text box for entering email addres. 
                                label="Email Address"
                                icon="mail"
                                placeholder="welcome@gmail.com"
                                placeholderTextColor= '#9CA3AF'
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                            />


                        <Text style={{ fontSize :16, paddingBottom : 1}}>Date of Birth</Text>
                        <TouchableOpacity onPress={() => setShow(true)} style={styles.textInput}>
                            <Text style={styles.dateText}>{date.toDateString()}</Text>
                        </TouchableOpacity>

                        {show && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="default"
                                onChange={onChange}
                            />
                        )}


                            <MyTextInput
                                label="Password"
                                icon="lock"
                                placeholder="Enter Password"
                                placeholderTextColor= '#9CA3AF'
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
                                placeholderTextColor= '#9CA3AF'
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
                            
                             <Text style={{ textAlign: 'center', fontSize: 20 }}>...</Text>
                            <TouchableOpacity style={styles.SignInStyleButton} onPress={handleSubmit}>
                                <Text style={{color: '#FAF3E6', fontSize : 16, textAlign : 'center' , justifyContent : 'center' , }}> SignUp </Text>
                            </TouchableOpacity>
                            <Text style={styles.horizontalLineStyle}></Text>

                        
                            {/** display text and link to login page at the end of page. */}
                            <View style={{justifyContent : 'center', flexDirection : 'row', 
                                            alignItems : 'center' ,}}>
                                <Text style={{ justifyContent: 'center', alignContent : 'center', color : '#1F2937', fontSize : 15}}>Already have an account? </Text>
                                {/*Change screen from signup.js t ologin.js when user click button */}
                                <TouchableOpacity style={{justifyContent : 'center',alignItems : 'center' }}
                                 onPress={() => navigation.navigate('Login')}>
                                    <Text style={{color :'#000080', fontSize :15 }}>Login</Text>
                                    </TouchableOpacity>
                            
                            </View>


                        </View>
                    )}
                </Formik>
            </View>
        </View>
    );
};



export default Singup;  // use .js name 

// Get the height of the status bar on the device : https://stackoverflow.com/questions/64926356/paddingtop-platform-os-android-statusbar-currentheight-0
const StatusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

export const Colors = {
    tertiary: '#1F2937',
};
const { tertiary,  } = Colors;


// Define styled components -fixed 
const styles = StyleSheet.create({
    SignInStyleButton : { // for login button style 
        marginTop : 10,
        padding: 15,
        backgroundColor: '#6495ED',  // dark  navy 
        justifyContent:  'center', // centered
        alignItems: 'center', // horionzontally
        borderRadius:5,// '7px',
        marginVertical: 3,//'5px',
        height: 50, //'60px', 
    } , 

    MainContainer : { 
        flex: 1,
        padding: '5%', 
        paddingTop: StatusBarHeight,  // Padding top including StatusBar height
        backgroundColor:'#FAF3E6',// sky blue
        width : '100%',
        height :'100%',
       },
    
       SmallerContainer : { 
        width: '100%',
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center', // Center content vertically - add 
       },

       Title : {
        // Health journaling App text styling 
        fontSize: 32, //'32px', /* if props.welcome is ture font size : 35 else 30px*/
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#000080',
      //  padding: '10px', // Padding of 10 pixels
       }, 
       
       SubText : { 
        // display account login text styling 
        fontSize: 18, //'18px',
        marginBottom: 5, //'20px',
        letterSpacing: 1, //'1px',
        fontWeight: 'bold',
        color:  '#1F2937',
        marginBottom:  2, //'5px' ,
        textAlign:'center',
        paddingBottom : 7,
       },

       TextInputLabel : {
        // padding: "10px",
        padding: 1,
        //paddingLeft: "55px",
       // paddingLeft: 5,
       // paddingRight: 55,
        borderRadius: 5,
        fontSize: 16,
        // height: "60px",
        height: 20,
       // marginVertical: "3px",
      // marginVertical: 3,
       // marginBottom: "10px",
        color: "#1F2937",
        minHeight: 10,
       },

       horizontalLineStyle: {
        height: 1.5,  // make line little thicker. 
        width: '100%',
        backgroundColor: '#9CA3AF',
        marginVertical: '5%',
      },

      righticonstyle: {
        right: '5%',
        top: '40%',
        position: 'absolute',
        zIndex: 1,
      },

      textInputStyle: {
        backgroundColor: '#E5E7EB',
        padding: 15,
        paddingLeft: 55,
        paddingRight: 55,
        borderRadius: 5,
        fontSize: 16,
        height: 60,
        marginVertical: 3,
        marginBottom: 10,
        color: '#1F2937',
      },
       
      formContainer: {
        width: '90%',
    },
    textInput: {
        backgroundColor: '#E5E7EB',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        minHeight : 10,

    },
    dateText: {
        color: '#1F2937',
        fontSize: 16,
    },


});
