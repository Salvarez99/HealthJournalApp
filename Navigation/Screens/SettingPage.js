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
} from "react-native";

// icon
import { Octicons, Fontisto, Ionicons } from "@expo/vector-icons"; // Ionicons : for isPassword , Fontisto : for goole icon

//for navigation
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import AccountSetting from "./AccountSetting";
import StorageSetting from "./StorageSetting";

// import on app.js on navigation stack.
export default function SettingPage() {
  // init navigation hook.
  const navigation = useNavigation();

  const handleAccountSetting = () => {
    navigation.navigate("AccountSetting");
  };

  const handleStorageSetting = () => {
    navigation.navigate("StorageSetting");
  };
  // storageSetting
  return (
    <View style={styles.container}>
      <View
        style={{
          top: -250,
          minWidth: "98%",
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 5,
          paddingRight: 5,
          borderColor: "black",
          borderWidth: 1,
          borderRadius: 10,
        }}
      >
        <Text style={styles.titleStyle}>Setting Options</Text>
        {/*account setting button */}
        <TouchableOpacity
          onPress={handleAccountSetting}
          style={[styles.button, { backgroundColor: "lightblue" }]}
        >
          <Text style={styles.buttonText}>Account Setting</Text>
        </TouchableOpacity>

        {/*storage setting button */}
        <TouchableOpacity
          onPress={handleStorageSetting}
          style={[styles.button, { backgroundColor: "lightblue" }]}
        >
          <Text style={styles.buttonText}>Storage Setting</Text>
        </TouchableOpacity>
      </View>
      {/* Exit Button */}
      <TouchableOpacity
        style={styles.exitButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="exit-outline" size={24} color="lightblue" />
        <Text style={styles.exitButtonText}>Exit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  titleStyle: {
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 5,
    fontWeight: "bold",
  },

  button: {
    minWidth: "90%",
    minHeight: 50,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
  },
  exitButton: {
    position: "absolute",
    bottom: 60,
    right: 20,
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    minWidth: 80,
  },

  exitButtonText: {
    color: "white",
    fontSize: 16,
    ...Platform.select({
      ios: {
        fontFamily: "Times New Roman", // Set font family to Times New Roman
      },
    }),
  },
});
