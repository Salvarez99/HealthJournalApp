import { FIREBASE_AUTH } from "../../firebaseConfig";
import { FIREBASE_APP } from "../../firebaseConfig";

import {
  reauthenticateWithCredential,
  updatePassword,
  EmailAuthProvider,
  EmailAuthCredential,
} from "firebase/auth";
// citation learned from : https://www.youtube.com/watch?v=BQ-kHwLlhrg
// import formik
import { Formik } from "formik";
import {
  Platform,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Text,
  TextInput,
} from "react-native";

//for navigation
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
// import on app.js on navigation stack.

const auth = FIREBASE_AUTH;
const app = FIREBASE_APP;

// overall design idea : https://www.rnexamples.com/react-native-examples/bN/Change-password-form
export default function AccountSetting() {
  // init navigation hook.
  const navigation = useNavigation();

  // check whether newpassword matches with retypePassword
  const resetPassword = async ({
    currentPassword,
    newPassword,
    retypePassword,
  }) => {
    if (newPassword !== retypePassword) {
      Alert.alert("Error", "Your password doesn't match!");
    } else {
      try {
        var cred = EmailAuthProvider.credential(
          auth.currentUser.email,
          currentPassword
        );
        await reauthenticateWithCredential(auth.currentUser, cred);
        updatePassword(auth.currentUser, newPassword);
        //console.log(values);
        Alert.alert("Success", "Password Changed!");
        navigation.navigate("SettingPage");
      } catch (error) {
        Alert.alert("Error", error.message);
        console.log("Error changing password,", error.message);
      }
    }
  };

  // const take inputs and make it function
  const MyTextInput = ({
    label,
    hidePassword,
    setHidePassword,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    retypePassword,
    setRetypePassword,
    ...props
  }) => {
    return (
      <View>
        <Text>{label}</Text>
        <TextInput style={styles.textInputStyle} {...props} />
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.SmallerContainer}>
        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            retypePassword: "",
          }}
          onSubmit={resetPassword}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View
              style={{
                flex: 1,
                alignContent: "center",
                padding: 20,
                paddingTop: 110,
              }}
            >
              <Text style={styles.labelText}>Current password </Text>
              <MyTextInput
                lable="Current password"
                placeholder="************"
                placeholderTextColor="#9CA3AF"
                onChangeText={handleChange("currentPassword")}
                onBlur={handleBlur("currentPassword")}
                value={values.currentPassword}
                secureTextEntry={true}
              />
              <Text style={styles.labelText}>New password </Text>
              <MyTextInput
                lable="New password"
                icon="lock"
                placeholder="Enter a new password"
                placeholderTextColor="#9CA3AF"
                onChangeText={handleChange("newPassword")}
                onBlur={handleBlur("newPassword")}
                value={values.newPassword}
                secureTextEntry={true}
              />

              <Text style={styles.labelText}>Repeat new password</Text>
              <MyTextInput
                lable="Repeat new password"
                icon="lock"
                placeholder="Repeat your new password"
                placeholderTextColor="#9CA3AF"
                onChangeText={handleChange("retypePassword")}
                onBlur={handleBlur("retypePassword")}
                value={values.retypePassword}
                secureTextEntry={true}
              />

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
              >
                <Text style={styles.TextInButton}> Change password </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "pink",
  },
  SmallerContainer: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  labelText: {
    top: -80,
    paddingLeft: 5,
    fontSize: 16,
    paddingBottom: 6,
    fontWeight: "bold",
  },
  textInputStyle: {
    top: -100,
    padding: 7,
    paddingLeft: 20,
    paddingRight: 55,
    borderRadius: 5,
    fontSize: 16,
    height: 50,
    color: "#1F2937",
    borderWidth: 1.5,
    borderColor: "lightgray",
  },
  submitButton: {
    // for login button style
    marginTop: -80,
    backgroundColor: "lightblue",
    justifyContent: "center", // centered
    alignItems: "center", // horionzontally
    borderRadius: 5,
    height: 48,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  TextInput: {
    color: "#FAF3E6",
    fontSize: 16, //'16px',
    fontWeight: "bold",
  },
});
