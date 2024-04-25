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
  ScrollView,
} from "react-native";
import Medication from "../Classes/Medication";
import DropDownList from "../Components/DosageSchedDropDown";
import WeekDaysButtons from "../Components/WeekdayButtons";
import { insertMedicine } from "../LocalStorage/LocalDatabaseManager";

const AddMedicationForm = ({ isVisible, onClose }) => {
  const [medicationName, setMedicationName] = new useState("");
  const [dosage, setDosage] = new useState("");
  const [dosageSchedule, setDosageSchedule] = new useState("Morning");
  const [frequency, setFrequency] = useState([]);
  let medication = null;

  const clearFields = () => {
    setMedicationName("");
    setDosage("");
    setDosageSchedule("Morning");
    setFrequency([]);
    onClose();
  };

  
  const onSave = () => {
    medication = new Medication(
      medicationName,
      dosage,
      dosageSchedule,
      frequency
    );
    insertMedicine(
      medication.name,
      medication.dosage,
      medication.dosageSchedule,
      medication.frequency
    )
      .then(() => {
        //console.log("Medication saved successfully");
        clearFields();
      })
      .catch((error) => {
        console.error("Error saving medication:", error);
      });
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
                value={medicationName}
                onChangeText={setMedicationName}
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
            <DropDownList setDosageSchedule={setDosageSchedule} />

            <View>
              <Text style={styles.buttonHeaderText}>Frequency: </Text>
            </View>

            <WeekDaysButtons
              selectedDays={frequency}
              setSelectedDays={setFrequency}
            />

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
    height: 350,
    borderRadius: 10,
    alignItems: "center",
    position: "absolute",
    top: 60,
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
    height: 50,
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
    height: 50,
    backgroundColor: "white",
    width: "100%",
    height: "90%",
    padding: 18,
    paddingTop: 5,
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
