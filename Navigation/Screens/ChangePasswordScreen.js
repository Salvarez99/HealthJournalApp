import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
// citation learned from : https://www.youtube.com/watch?v=BQ-kHwLlhrg
import styled from 'styled-components/native';
// import formik
import { Formik } from 'formik';
import {  Platform, Button, View, StyleSheet, TouchableOpacity, Image, Alert, Text, TextInput } from 'react-native';

// icon
import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons'; // Ionicons : for isPassword , Fontisto : for goole icon

//for navigation
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import SettingPage from './SettingPage';
// import on app.js on navigation stack. 

// overall design idea : https://www.rnexamples.com/react-native-examples/bN/Change-password-form 
export default function AccountSetting(){

   // init navigation hook.
   const navigation = useNavigation(); 
   // init const variable 
   const [hidePassword, setHidePassword] = useState(true); // default hide password
   const [currentPassword, setCurrentPassword] = useState(null); 
   const [newPassword, setNewPassword] = useState(null); 
   const [retypePassword, setRetypePassword]  = useState(null); 

   // check wheter newpassword matches wit hretypePassword
   const resetPassword = (value) => {
    if (value.newPassword !== value.retypePassword) {
      Alert.alert("Error", "Your password doesn't match!");
    } else {
      console.log(value);  // Ideally, replace this with a call to your backend
      Alert.alert("Success", "Password Changed!");
     // navigation.navigate('SettingPage');
    }
  };
   
   // const take inputs and make it function 
   const MyTextInput = ({label, hidePassword, setHidePassword, currentPassword, setCurrentPassword, newPassword, setNewPassword, retypePassword, setRetypePassword, ...props}) =>{
    return(
      <View>
        <Text>{label}</Text>
        <TextInput style={styles.textInputStyle} {...props}/>


      </View>
    )
   }


return(
  <View style={styles.MainContainer}>
            <StatusBar style="dark" />
            <View style={styles.SmallerContainer}>
                <Text style={styles.Title}>Change Password</Text>

      <Formik 
      initialValues = {{currentPassword : '', newPassword : '', retypePassword : '', }}
      onSubmit={resetPassword}
    >
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <View style={{width: '90%'}}>
        
        <Text style={styles.labelText}>Current password </Text>
        <MyTextInput
          lable="Current password"
          placeholder="************"
          placeholderTextColor= '#9CA3AF'
          onChangeText={handleChange('currentPassword')}
          onBlur={handleBlur('currentPassword')}
          value={values.currentPassword}
          secureTextEntry={true}
          />
        <Text style={styles.labelText}>New password </Text>
        <MyTextInput
          lable="New password"
          icon = "lock"
          placeholder="Enter a new password"
          placeholderTextColor= '#9CA3AF'
          onChangeText={handleChange('newPassword')}
          onBlur={handleBlur('newPassword')}
          value={values.newPassword}
          secureTextEntry={true}
          />

         <Text style={styles.labelText}>Repeat new password</Text>
          <MyTextInput
          lable="Repeat new password"
          icon = "lock"
          placeholder="Repeat your new password"
          placeholderTextColor= '#9CA3AF'
          onChangeText={handleChange('retypePassword')}
          onBlur={handleBlur('retypePassword')}
          value={values.retypePassword}
          secureTextEntry={true}
          />

       <TouchableOpacity style={styles.submitButton} onPress={resetPassword}>
           <Text style={styles.TextInButton}> Change password </Text>
       </TouchableOpacity>



      </View>
    )}

    </Formik>
     

      {/* Exit Button */}
      <TouchableOpacity style={styles.exitButton} onPress={() => navigation.goBack()}>
         <Ionicons name="exit-outline" size={24} color="lightblue" />
          <Text style={styles.exitButtonText}>Exit</Text>
        </TouchableOpacity>

        </View>
   </View>
);
};


// Get the height of the status bar on the device : https://stackoverflow.com/questions/64926356/paddingtop-platform-os-android-statusbar-currentheight-0
const StatusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;


const styles = StyleSheet.create({
  
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
   top : - 130,
   },  
    
   labelText :{
    top : -80,
    paddingLeft : 5,
    fontSize : 17,
    paddingBottom : 6,
    
   },

   // for MyTextInput 

   textInputStyle: {
   top : - 100,
    //backgroundColor: '#E5E7EB',
    padding: 7,
    paddingLeft: 20,
    paddingRight: 55,
    borderRadius: 5,
    fontSize: 16,
    height: 50,
    color: '#1F2937',
    borderWidth : 1.5, 
    borderColor : 'lightgray',
  },
   


  exitButton: {
    position: 'absolute',
    bottom: 60,
    right: 20,
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    minWidth : 80,
  },

  exitButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Times New Roman',
  },

  submitButton : { // for login button style 
    marginTop : -60,
    backgroundColor: '#1E90FF',
    justifyContent:  'center', // centered
    alignItems: 'center', // horionzontally
    borderRadius: 7, //'7px',
    height: 48, //'60px', 
    
} , 

TextInput : {
  color: '#FAF3E6',
  fontSize: 16, //'16px',
  fontWeight: 'bold',
 }, 




});


