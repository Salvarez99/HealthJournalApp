import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
// citation learned from : https://www.youtube.com/watch?v=BQ-kHwLlhrg
import styled from "styled-components/native";
// import formik
import { Formik } from "formik";
import {
  Platform,
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  Alert,
} from "react-native";
//import { GoogleSignIn, GoogleSigninButton, statusCodes} from '@react-native-google-signin/google-signin';
// icon
import { Octicons, Fontisto, Ionicons } from "@expo/vector-icons"; // Ionicons : for isPassword , Fontisto : for goole icon

//for navigation
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import { FIREBASE_AUTH, GOOGLE_WEB_CLIENT_ID } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

/*
GoogleSignIn.configure({
    webClientId: '410912398218-m6m62b5tm65eqt9doql9h0h8umrddu09.apps.googleusercontent.com',
});
*/
// handle login
// const Login = () => {
export default function Login() {
  // init navigation hook.
  const navigation = useNavigation();

  const auth = FIREBASE_AUTH;

  // use Usestate hook for pasword
  const [hidePassword, setHidePassword] = useState(true); //default is true

  const handleLogin = async ({ email, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      navigation.navigate("MainContainer");
      console.log("Logging in successful!", user);
    } catch (error) {
      console.log(email);
      console.log(password);
      Alert.alert("Error logging in", error.message);
    }
  };
  
  
  // MyTextInput component : https://www.youtube.com/watch?v=BQ-kHwLlhrg
  const MyTextInput = ({
    label,
    icon,
    isPassword,
    hidePassword,
    setHidePassword,
    ...props
  }) => {
    return (
      <View>
        <View style={styles.IconStyle}>
          <Octicons name={icon} size={30} color="#000080" />
        </View>
        <Text style={styles.TextInputLabel}>{label}</Text>
        <TextInput style={styles.textInputStyle} {...props} />
        {isPassword && (
          <TouchableOpacity
            style={styles.righticonstyle}
            onPress={() => setHidePassword(!hidePassword)}
          >
            <Ionicons
              name={hidePassword ? "eye-off" : "eye"}
              size={30}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  // most of container components are defined in style.js
  return (
    <View style={styles.MainContainer}>
      <StatusBar style="dark" />
      <View style={styles.SmallerContainer}>
        <Image
          style={styles.MainPageImage}
          resizeMode="cover"
          source={require("../../assets/login_page.png")}
        />
        <Text style={styles.Title}>Pulse Journal</Text>
        <Text style={styles.SubText}>Account Login</Text>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.FormArea}>
              <MyTextInput
                required
                label="Email Address"
                icon="mail"
                placeholder="welcome@gmail.com"
                placeholderTextColor="#9CA3AF"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
              />
              <MyTextInput
                required
                label="Password"
                icon="lock"
                placeholder="Enter Password"
                placeholderTextColor="#9CA3AF"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
               
                // hide password while user typing for security purpose
                secureTextEntry={hidePassword}
                isPassword={true}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
              />
              <Text style={{ textAlign: "center", fontSize: 20 }}>...</Text>

              <TouchableOpacity
                style={styles.LoginStyleButton}
                onPress={handleSubmit}
              >
                <Text style={styles.LoginTextInButton}> Login </Text>
              </TouchableOpacity>
              <Text style={styles.horizontalLineStyle}></Text>

              <TouchableOpacity
                style={styles.GoogleStyleButton}
                google={true}
                onPress={() => navigation.navigate("MainContainer")}
              >
                <Fontisto name="google" color="#FAF3E6" size={20} />
                <Text style={styles.GoogleTextInButton}>
                  Sign in with Google
                </Text>
              </TouchableOpacity>

              <View style={styles.StyleView}>
                <Text
                  style={{
                    justifyContent: "center",
                    alignContent: "center",
                    paddingTop: 5,
                    color: "#1F2937",
                    fontSize: 15,
                  }}
                >
                  Don't have an account yet?{" "}
                </Text>

                {/*Change screen from login.js to Signup.js when user click button */}
                <TouchableOpacity
                  style={{ justifyContent: "center", alignItems: "center" }}
                  onPress={() => navigation.navigate("Signup")}
                >
                  <Text
                    style={{
                      color: "#000080",
                      fontSize: 15,
                      borderBottomWidth: 1,
                      borderColor: "#000080",
                      paddingTop: 4,
                    }}
                  >
                    Sign up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}


// Get the height of the status bar on the device : https://stackoverflow.com/questions/64926356/paddingtop-platform-os-android-statusbar-currentheight-0
const StatusBarHeight = Platform.OS === "android" ? StatusBar.currentHeight : 0;

// Define styled components -fixed
const styles = StyleSheet.create({
  LoginStyleButton: { // for login button style
    marginTop: 10,
    padding: 15,
    backgroundColor: "#6495ED", // dark  navy
    justifyContent: "center", 
    alignItems: "center", 
    borderRadius: 7, 
    height: 55,
  },
  GoogleStyleButton: { // for google login button
    padding: 2, 
    backgroundColor: "#6495ED", 
    justifyContent: "center", 
    alignItems: "center", 
    borderRadius: 7, 
    flexDirection: "row",
  },
  // for left , right side icon style
  IconStyle: {
    left: "5%",
    top: "40%",
    position: "absolute",
    zIndex: 1, // stack icon above box component. citation : https://docs.expo.dev/ui-programming/z-index/
  },
  MainContainer: {
    flex: 1,
    padding: "5%", 
    paddingTop: StatusBarHeight, 
    backgroundColor: "#FAF3E6", // sky blue
    width: "100%",
    height: "100%",
  },

  SmallerContainer: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center", 
  },

  MainPageImage: {
    paddingTop: 230, 
    width: "70%", 
    height: 200, 
  },

  Title: {  // Health journaling App text styling
    fontSize: 32, 
    textAlign: "center",
    fontWeight: "bold",
    color: "#000080",
  },

  SubText: { // display account login text styling
    fontSize: 18, 
    marginBottom: 5, 
    letterSpacing: 1, 
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 2, 
    textAlign: "center",
    paddingBottom: 7,
  },

  FormArea: {
    width: "85%",
  },
  TextInputLabel: {
    padding: 3,
    borderRadius: 5,
    fontSize: 16,
    height: 25,
    color: "#1F2937",
    minHeight: 20,
  },

  LoginTextInButton: {
    color: "#FAF3E6",
    fontSize: 16, 
   
  },

  righticonstyle: {
    right: "5%",
    top: "40%",
    position: "absolute",
    zIndex: 1,
  },

  GoogleTextInButton: {
    color: "#FAF3E6",
    fontSize: 16,
    padding: 3,
    paddingLeft: "7%", 
    marginTop: 12,
    marginBottom: 12,
  },
  messageBox: {
    textAlign: "center",
    fontSize: 20, 
  },

  horizontalLineStyle: {
    height: 1.5, 
    width: "100%",
    backgroundColor: "#9CA3AF",
    marginVertical: "5%",
  },

  StyleView: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    padding: 2, 
  },

  textInputStyle: {
    backgroundColor: "#E5E7EB",
    padding: 15,
    paddingLeft: 55,
    paddingRight: 55,
    borderRadius: 5,
    fontSize: 16,
    height: 60,
    marginVertical: 3,
    marginBottom: 10,
    color: "#1F2937",
  },
});
