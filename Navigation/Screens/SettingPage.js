import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook

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
    <View style={styles.mainContainer}>
      <View style={styles.buttonsContainer}>
        {/*account setting button */}
        <TouchableOpacity
          onPress={handleAccountSetting}
          style={styles.settingsButtons}
        >
          <Text style={styles.buttonText}>Account Settings</Text>
        </TouchableOpacity>

        {/*storage setting button */}
        <TouchableOpacity
          onPress={handleStorageSetting}
          style={styles.settingsButtons}
        >
          <Text style={styles.buttonText}>Storage Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  buttonsContainer: {
    width: "100%",
    position: "absolute",
    top: 0,
  },
  toggleContainer: {
    justifyContent: "center",
    paddingRight: 10,
  },
  settingsButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: 60,
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
  },
  buttonText: {
    fontSize: 16,
  },
});
