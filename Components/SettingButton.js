// creating setting button component
import React from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import SettingPage from "../Navigation/Screens/SettingPage";
//for navigation
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook

const SettingButton = () => {
  // init navigation hook.
  const navigation = useNavigation();

  const handleClick = () => {
    navigation.navigate("SettingPage");
  };

  return (
    <TouchableOpacity
      onPress={handleClick}
      style={{ flexDirection: "row", alignItems: "center", paddingRight: 10 }}
    >
      <Ionicons name="settings" size={30} color="#2196F3" />
      <Text style={{ marginLeft: 5, fontSize: 14 }}>Setting</Text>
    </TouchableOpacity>
  );
};

export default SettingButton;
