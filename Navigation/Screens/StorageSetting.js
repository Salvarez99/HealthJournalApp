import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Switch,
} from "react-native";
import {clearJournalEntry, clearUserIllness, clearUserTest, clearUserSymptom, clearMedicineEntry} from "../../LocalStorage/ClearLocalDB";
import { removeUserJournals, removeUserAppointments, removeUserMedications } from "../../LocalStorage/RemoveLocalDB";
import { fetchUser } from "../../LocalStorage/FetchLocalDB";
import { remove } from "firebase/database";

export default function StorageSetting() {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    !isEnabled
      ? alert("Cloud Storage Enabled")
      : alert("Cloud Storage Disabled");
      
      //TODO: db logic goes here
    };
    const removeJournals = async () => {
      // //TODO: db logic goes here
    const users = await fetchUser();
    await removeUserJournals(users[0].uid);
    alert("Removed Journals.");
  };

  const removeMedications = async() => {
    //db logic goes here
    
    const users = await fetchUser();
    await removeUserMedications(users[0].uid);
    alert("Removed medications.");
  };

  const removeAppoinments = async() => {
    //db logic goes here
    console.log("Appointments")
    const users = await fetchUser();
    await removeUserAppointments(users[0].uid);
    alert("Removed appointments.");
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
          <Text style={styles.buttonText}>Remove Local Journals </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.storageButtons}
          onPress={removeMedications}
        >
          <Text style={styles.buttonText}>Remove Local Medications </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.storageButtons}
          onPress={removeAppoinments}
        >
          <Text style={styles.buttonText}>Remove Local Appointments </Text>
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
