/***************************************************************************************
 * Authors: Stephen Alvarez
 * Date: 5/1/2024
 * Code Version: 1.0
 * 
 * Description:
 *  Renders a form that takes user input to fill out fields required for Medications.
 * Adds gathered data to local DB table when onSave() is triggered or clears data when form  
 * is closed without changing tables.
 * 
 * 
 ***************************************************************************************/
import Ionicons from "react-native-vector-icons/Ionicons"; //Vector Icons are used for button icons
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Platform,
  TextInput,
} from "react-native";
import Medication from "../Classes/Medication";
import DropDownList from "../Components/DosageSchedDropDown";
import WeekDaysButtons from "../Components/WeekdayButtons";
import {
  addMedicineEntry
} from "../LocalStorage/LocalDatabase";


const AddMedicationForm = ({ isVisible, onClose }) => {
  const [medicationName, setMedicationName] = new useState("");
  const [dosage, setDosage] = new useState("");
  const [dosageSchedule, setDosageSchedule] = new useState("Morning");
  /**
   * List of ints
   * Range from 0 - 6 
   * 0 = Sunday,
   * 1 = Monday, 
   * ... 
   * 6 = Saturday
   */
  const [frequency, setFrequency] = useState([]); 
  let medication = null;  //To be used to store data into an {JournalEntry} instance
  
  /**
   * Resets form's fields to default values then closes form
   */
  const clearFields = () => {
    setMedicationName("");
    setDosage("");
    setDosageSchedule("Morning");
    setFrequency([]);
    onClose();
  };

  /**
   * Takes collected user data and pushes the data either to local or storage
   */
    const onSave = async () => {
      // Create a new Medication object
      const medication = new Medication(
        medicationName,
        dosage,
        dosageSchedule,
        frequency
      );
    
      // Check if required fields are filled out
      if (!/^\s*$/.test(medication.name) && medication.dosage !== "" && medication.frequency.length !== 0) {
        try {
          // Add the medication entry to the database
          const insertId = await addMedicineEntry(medication.name, medication.dosage, medication.dosageSchedule, JSON.stringify(medication.frequency));
    
          // Log success message
          console.log("Medicine entry added successfully with ID:", insertId);
          clearFields();
          onClose();
        } catch (error) {
          // Log and handle any errors
          console.error("Error adding medicine entry:", error);
          // Optionally, you could show an alert or error message to the user
        }
      } else {
        alert('Required fields missing.\nRequired fields contains \'*\'.')
      }
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
            {/**Form content goes in this scope */}
            <View>
              <Text style={styles.buttonHeaderText}>*Medication Name: </Text>
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
              <Text style={styles.buttonHeaderText}>*Dosage: </Text>
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
              <Text style={styles.buttonHeaderText}>*Frequency: </Text>
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