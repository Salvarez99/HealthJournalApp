import React, { useState, useContext, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
// citation learned from : https://www.youtube.com/watch?v=BQ-kHwLlhrg

// import formik
import { Formik } from 'formik';
import styled from 'styled-components/native';
import { Platform, Button, View, StyleSheet, TouchableOpacity, Image, Text, TextInput } from 'react-native';

// icon
import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons'; // Ionicons : for isPassword , Fontisto : for goole icon.
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScreenOrientation } from 'expo';  // import screenorientation 
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook



// handle Signup 
const Signup = () => {
   // init navigation hook.
   const navigation = useNavigation(); 

    // use Usestate hook for pasword 
    const [hidePassword, setHidePassword] = useState(true); //default is true
    const [show, setShow] = useState(false);// show for the datetimepicker
    const [date, setDate] = useState(new Date(2024, 12, 14));// set this date as default
    const auth = FIREBASE_AUTH;

    // variable to hold actural date of birth to be sent 
    const [dob, setDob] = useState();

    const register = async({email,password,dateOfBirth}) =>{
        try{
            dateOfBirth = dob.toLocaleDateString();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            navigation.navigate('Login');
            console.log("Registration successful! ", user);
        }
        catch(error){
            console.log(email);
            console.log(password);
            console.log("Error creating user", error.message);
        }
    };
        
    


    const onChange = (event, selectDate) => {
        const currentDate = selectDate || date; 
        setShow(false); 
        //set date as current date 
        setDate(currentDate); 
        setDob(currentDate); 
    }

    const showDatePicker = () => {  
        setShow(true);
    };

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
            
                {/* Use Formik Library to manage form state and handle submission.  */}
                <Formik
                    initialValues={{ fullName: '',  email: '', dateOfBirth : '', password: '', confirmPassword : '', }}
                    onSubmit={register} // declare properties in initialValues={}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View style={{width: '85%'}}>
                            <MyTextInput
                            // text input box for entering name 
                                label="Full Name"
                                icon="person"
                                placeholder=""  // default value
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



export default Signup;  // use .js name 

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
        backgroundColor: '#6495ED',  
        justifyContent:  'center', 
        alignItems: 'center', 
        borderRadius:5,
        marginVertical: 3,
        height: 50, 
    } , 

    MainContainer : { 
        flex: 1,
        padding: '5%', 
        paddingTop: StatusBarHeight, 
        backgroundColor:'#FAF3E6',
        width : '100%',
        height :'100%',
       },
    
       SmallerContainer : { 
        width: '100%',
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center', 
       },

       Title : {
        fontSize: 32, 
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#000080',
       }, 
       
       SubText : { 
        fontSize: 18, 
        marginBottom: 5, 
        letterSpacing: 1,
        fontWeight: 'bold',
        color:  '#1F2937',
        marginBottom:  2, 
        textAlign:'center',
        paddingBottom : 7,
       },

       TextInputLabel : {
        padding: 1,
        borderRadius: 5,
        fontSize: 16,
        height: 20,
        color: "#1F2937",
        minHeight: 10,
       },

       horizontalLineStyle: {
        height: 1.5,   
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
