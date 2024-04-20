import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
// citation learned from : https://www.youtube.com/watch?v=BQ-kHwLlhrg
import styled from 'styled-components/native';
// import formik
import { Formik } from 'formik';
import {  Platform, Button, View, StyleSheet, TouchableOpacity, Image, Text, TextInput } from 'react-native';

// icon
import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons'; // Ionicons : for isPassword , Fontisto : for goole icon

//for navigation
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

// handle login 
// const Login = () => {
export default function Login(){
    // init navigation hook.
    const navigation = useNavigation(); 

    // use Usestate hook for pasword 
    const [hidePassword, setHidePassword] = useState(true); //default is true

    const handleLogin = () => {
        navigation.navigate('MainContainer');
      };

    // MyTextInput component : https://www.youtube.com/watch?v=BQ-kHwLlhrg
    const MyTextInput = ({ label, icon,isPassword,hidePassword, setHidePassword, ...props }) => {
        return (
            <View>
                <View style={styles.IconStyle}>
                    <Octicons name={icon} size={30} color='#000080'/>
                </View>
                <Text style={styles.TextInputLabel}>{label}</Text>
                <TextInput style={styles.textInputStyle} {...props} />
                {isPassword && (
                    <TouchableOpacity style={styles.righticonstyle}   onPress={()=> setHidePassword(!hidePassword)}>
                        <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={30} color='#9CA3AF' />
                    </TouchableOpacity>

                )}
                
            </View>
        );
    };

      // most of container components are defined in style.js
    return(
        <View style={styles.MainContainer}>
            <StatusBar style="dark" />
            <View style={styles.SmallerContainer}>
                <Image style={styles.MainPageImage } resizeMode ="cover" source={require('../../assets/login_page.png')}/>
                <Text style={styles.Title}>Health Journaling App</Text>
                <Text style={styles.SubText}>Account Login</Text>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={(values) => {
                        console.log(values);
                        // change screen from login.js to welcome.js 
                       navigation.navigate('MainContainer');
                    }}
                >
                
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View style={styles.FormArea}>
                            <MyTextInput
                                label="Email Address"
                                icon="mail"
                                placeholder="welcome@gmail.com"
                                placeholderTextColor= '#9CA3AF'
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                            />
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
                            <Text style={{ textAlign: 'center', fontSize: 20 }}>...</Text>

                            <TouchableOpacity style={styles.LoginStyleButton} onPress={handleLogin}>
                                <Text style={styles.LoginTextInButton}> Login </Text>
                            </TouchableOpacity>
                            <Text style={styles.horizontalLineStyle}></Text>

                            <TouchableOpacity style={styles.GoogleStyleButton} google={true} onPress={handleSubmit}>
                                <Fontisto name="google" color='#FAF3E6' size={20}/>
                                <Text style={styles.GoogleTextInButton}>
                                    Sign in with Google
                                </Text>
                            </TouchableOpacity>

                            <View style={styles.StyleView}>
                            <Text style={{ justifyContent: "center", alignContent: "center",  paddingTop : 5, color:'#1F2937', fontSize: 15 
                                        }}>Don't have an account yet? </Text>

                                {/*Change screen from login.js to Signup.js when user click button */}
                                <TouchableOpacity style={{justifyContent : 'center', alignItems : 'center' }}
                                 onPress={() => navigation.navigate('Signup')}>
                                    <Text style={{color :'#000080', fontSize :'15px'}}>Signup</Text>
                                </TouchableOpacity>
                            
                            </View>

                            
                         
                            

                        </View>
                    )}
                </Formik>
            </View>
        </View>
    );
};



// export default Login; 

// Get the height of the status bar on the device : https://stackoverflow.com/questions/64926356/paddingtop-platform-os-android-statusbar-currentheight-0
const StatusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

// Define styled components
const styles = StyleSheet.create({
    LoginStyleButton : { // for login button style 
        marginTop : 10,
        padding: 15,
        backgroundColor: '#6495ED',  // dark  navy 
        justifyContent:  'center', // centered
        alignItems: 'center', // horionzontally
        borderRadius: '7px',
        marginVertical: '5px',
        height: '60px', 
        
    } , 
    GoogleStyleButton : { // for google login button 
        padding: '4vh',
        backgroundColor: '#6495ED',  // dark  navy 
        justifyContent:  'center', // centered
        alignItems: 'center', // horionzontally
        borderRadius: '7px',
        marginVertical: '5px',
        flexDirection: 'row', 
      
    } , 
    // for left , right side icon style 
    IconStyle : { 
        left: '5%',
        top: '40%',
        position: 'absolute',
        zIndex: 1,  // stack icon above box component. citation : https://docs.expo.dev/ui-programming/z-index/
    }, 
   MainContainer : { 
    flex: 1,
    padding: '5%', // Padding of 5% of the screen width
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
   
   MainPageImage : {
    paddingTop: 230, // 20% of the screen height
    width: '70%', // Width of 250 pixels
    height: '200px', // Height of 200 pixels
   },
    
   Title : {
    // Health journaling App text styling 
    fontSize: '32px', /* if props.welcome is ture font size : 35 else 30px*/
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000080',
    padding: '10px', // Padding of 10 pixels
   }, 
   
   SubText : { 
    // display account login text styling 
    fontSize: '18px',
    marginBottom: '20px',
    letterSpacing: '1px',
    fontWeight: 'bold',
    color:  '#1F2937',
    marginBottom:  '5px' ,
    textAlign:'center',
    paddingBottom : 7,
   },

   FormArea : { 
    width: '85%', // styled form area (s.t. enter email, login box) set size of 85%of width

   },
   TextInputLabel : {
    padding: '10px',
    paddingLeft: '55px',
    paddingRight: '55px',
    borderRadius: '5px',
    fontSize: '16px',
    height: '60px',
    marginVertical: '3px',
    marginBottom: '10px',
    color: '#1F2937',
    minHeight : 20,
   },

   LoginTextInButton : {
    color: '#FAF3E6',
    fontSize: '16px',
    padding:  '20px' ,
 
   }, 

   righticonstyle: {
    right: '5%',
    top: '40%',
    position: 'absolute',
    zIndex: 1,
  },

   GoogleTextInButton : {
    color: '#FAF3E6',
    fontSize: '16px',
    padding:  '20px' ,
   paddingLeft : '7%' , // only for  signin with google button text 
   marginTop : 12, 
   marginBottom : 12, 
   },
   messageBox : { 
    textAlign: 'center', //horizontally
    fontSize: '20px',
   }, 

   horizontalLineStyle: {
    height: 1.5,  // make line little thicker. 
    width: '100%',
    backgroundColor: '#9CA3AF',
    marginVertical: '5%',
  },

   StyleView : { 
    justifyContent : 'center',
    flexDirection : 'row',
    alignItems : 'center',
    padding: '10px',
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
   


}); 



