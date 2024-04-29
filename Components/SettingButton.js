// creating setting button component
import React from "react";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
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
      style={{ paddingRight: 15 }}
    >
      <Ionicons name="settings-outline" size={30} color={'#2c72a3'} />
    </TouchableOpacity>
  );
};

export default SettingButton;
