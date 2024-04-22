import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Platform,
} from "react-native";

import SearchComponent from "../Components/SearchComponent";
import JournalEntry from "../Classes/JournalEntry";

const AddJournalEntryForm = ({ isVisible, onClose }) => {
  let dummySymptoms = [
    "Cough",
    "Headache",
    "Sore throat",
    "Back pain",
    "Congestion",
    "Light Headedness",
  ]; //Dummy db list, to be replaced with call to

  let dummyIllnesses = [
    "Cold",
    "Flu",
    "Pneumonia",
    "Cancer",
    "Allergies",
    "Pink eye",
  ]; //Dummy db list, to be replaced with call to db

  let dummyTest = [
    "Bloodwork",
    "X-Ray",
    "Physical Exam",
    "Biopsy",
    "Blood Pressure",
    "Cholestrol",
  ]; //Dummy db list, to be replaced with call to db

  const [symptoms, setSymptoms] = useState([]);
  const [illnesses, setIllnesses] = useState([]);
  const [tests, setTests] = useState([]);
  let journalEntry = null;

  const printLists = () => {
    console.log("Symptoms: \n");
    for (const symptom of symptoms) {
      console.log(
        symptom.name + ":" + symptom.startDate + " -> " + symptom.endDate + "\n"
      );
    }
    console.log("\n");
    console.log("Illnesses: \n");
    for (const illness of illnesses) {
      console.log(
        illness.name + ":" + illness.startDate + " -> " + illness.endDate + "\n"
      );
    }
    console.log("\n");

    console.log("Tests: \n");
    for (const test of tests) {
      console.log(test.name + ": " + test.dateOccured + "\n");
    }
    console.log("\n");
  };

  //TODO: Implement save functionality
  const onSave = () => {
    printLists();
    journalEntry = new JournalEntry(symptoms, illnesses, tests);
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
            <Text style={styles.modalHeaderText}> Add Journal Entry</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name={"close"} size={28} color={"black"} />
            </TouchableOpacity>
          </View>

          <View style={styles.modalFormContent}>
            <View>
              <Text style={styles.SearchComponentHeader}>Symptoms:</Text>
            </View>
            <View style={{ height: 100 }}>
              <SearchComponent
                searchData={dummySymptoms}
                typeDataInputted={"symptoms"}
                updateList={setSymptoms}
              />
            </View>
            <View>
              <Text style={styles.SearchComponentHeader}>Illnesses: </Text>
            </View>
            <View style={{ height: 100 }}>
              <SearchComponent
                searchData={dummyIllnesses}
                typeDataInputted={"illnesses"}
                updateList={setIllnesses}
              />
            </View>
            <View>
              <Text style={styles.SearchComponentHeader}>Test & Labworks:</Text>
            </View>
            <View style={{ height: 100 }}>
              <SearchComponent
                searchData={dummyTest}
                typeDataInputted={"tests"}
                updateList={setTests}
              />
            </View>

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
    height: 470,
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
  SearchComponentHeader: {
    fontWeight: "bold",
    paddingTop: 5,
    zIndex: 1,
  },

  saveButtonContainer: {
    position: "absolute",
    right: 15,
    bottom: 10,
  },
  closeButton: {
    position: "absolute",
    right: 20,
    top: 12,
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

export default AddJournalEntryForm;
