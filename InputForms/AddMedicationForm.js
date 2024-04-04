import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Platform,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";

import DropDownList from "../Components/DropDownList";
import WeekDaysButtons from "../Components/WeekdayButtons";

const AddMedicationForm = ({ isVisible, onClose }) => {
  const [medication, setMedication] = new useState("");
  const [dosage, setDosage] = new useState("");
  const [dosageSchedule, setDosageSchedule] = new useState(null);
  const [frequency, setFrequency] = useState([]); 

  const clearFields = () => {
    setMedication("");
    setDosage("");
    setDosageSchedule(null);
    setFrequency([]);
    onClose();
  };

  //TODO: Implement save functionality
  const onSave = () => {
    console.log("Medication: " + medication);
    console.log("Dosage: " + dosage);
    console.log('Dosage Schedule: ' + dosageSchedule);
    console.log('Frequency: ' + frequency);
    clearFields();
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalForm}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}> Add Medication</Text>
            <TouchableOpacity
              onPress={clearFields}
              style={{
                position: "absolute",
                right: 20,
                top: 12,
              }}
            >
              <Ionicons name={"close"} size={28} color={"black"} />
            </TouchableOpacity>
          </View>

          <View style={styles.modalFormContent}>
            <View>
              <Text style={styles.buttonHeaderText}>Medication Name: </Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: "black",
                  paddingLeft: 5,
                }}
                value={medication}
                onChangeText={setMedication}
              />
            </View>

            <View>
              <Text style={styles.buttonHeaderText}>Dosage: </Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: "black",
                  width: "50%",
                  paddingLeft: 5,
                }}
                value={dosage}
                onChangeText={setDosage}
              />
            </View>

            <View>
              <Text style={styles.buttonHeaderText}>Dosage Schedule: </Text>
            </View>
            <DropDownList setDosageSchedule={setDosageSchedule}/>

            <View>
              <Text style={styles.buttonHeaderText}>Frequency: </Text>
            </View>

            <WeekDaysButtons selectedDays={frequency} setSelectedDays={setFrequency} />

            <View style={styles.saveButtonContainer}>
              <TouchableOpacity onPress={onSave} style={styles.saveButton}>
                <Text>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalForm: {
    backgroundColor: "white",
    width: "90%",
    height: "60%",
    borderRadius: 10,
    alignItems: "center",
    bottom: "12%",
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
  modalHeader: {
    backgroundColor: "#d7dbe0",
    padding: 12,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalFormContent: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    padding: 18,
    paddingTop: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },

  saveButtonContainer: {
    position: "absolute",
    right: 15,
    bottom: 15,
  },
  saveButton: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "lightblue",
    width: 70,
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
  buttonHeaderText: {
    fontWeight: "bold",
    paddingTop: 4,
  },
});

export default AddMedicationForm;
