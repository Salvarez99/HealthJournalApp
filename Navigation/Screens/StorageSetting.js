import React, { useState } from "react";
import {
  Platform,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Switch,
} from "react-native";

export default function StorageSetting() {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    !isEnabled
      ? alert("Cloud Storage Enabled")
      : alert("Cloud Storage Disabled");

    //db logic goes here
  };
  const removeJournals = () => {
    //db logic goes here
    alert("Removed Journals from cloud.");
  };

  const removeMedications = () => {
    //db logic goes here
    alert("Removed medications from cloud.");
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.storageButtons} onPress={toggleSwitch}>
          <Text style={styles.buttonText}>Upload Data to Cloud </Text>
          <View style={styles.toggleContainer}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={"#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.storageButtons}
          onPress={removeJournals}
        >
          <Text style={styles.buttonText}>Remove Journals </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.storageButtons}
          onPress={removeMedications}
        >
          <Text style={styles.buttonText}>Remove Medications </Text>
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
  storageButtons: {
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