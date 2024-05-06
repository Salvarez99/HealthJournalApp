/***************************************************************************************
 * Authors: Stephen Alvarez
 * Date: 5/1/2024
 * Code Version: 1.0
 *
 * Description:
 *  Renders a form that takes user input to fill out fields required for Journal Entries
 *
 *
 *
 ***************************************************************************************/
import Ionicons from "react-native-vector-icons/Ionicons"; //Vector Icons are used for button icons
import React, { useState, useEffect } from "react";
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
import {
  addJournal,
  addJournalEntry,
  fetchSymptoms,
  addSymptom,
  fetchIllnesses,
  addIllness,
  fetchTests,
  addTest,
  addUserSymptom,
  addUserIllness,
  addUserTest,
  fetchLatestJournalEntry,
} from "../LocalStorage/LocalDatabase";

const AddJournalEntryForm = ({ isVisible, onClose }) => {
  const [userSymptoms, setUserSymptoms] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [userIllnesses, setUserIllnesses] = useState([]);
  const [illnesses, setIllnesses] = useState([]);
  const [userTests, setUserTests] = useState([]);
  const [tests, setTests] = useState([]);
  let journalEntry = null;

  useEffect(() => {
    if (isVisible) {
      // Fetch preloaded illnesses
      fetchIllnesses()
        .then((data) => {
          const illnessNames = data.map((illness) => illness.name);
          // console.log('Fetched illnesses:', data);
          // console.log(illnessNames);
          setIllnesses(illnessNames);
        })
        .catch((error) => {
          console.error("Error fetching illnesses:", error);
        });

      // Fetch preloaded symptoms
      fetchSymptoms()
        .then((data) => {
          const symptomNames = data.map((symptom) => symptom.name);
          // console.log('Fetched symptoms:', data);
          setSymptoms(symptomNames);
        })
        .catch((error) => {
          console.error("Error fetching symptoms:", error);
        });

      // Fetch preloaded tests
      fetchTests()
        .then((data) => {
          const testNames = data.map((test) => test.name);
          // console.log('Fetched tests:', data);
          setTests(testNames);
        })
        .catch((error) => {
          console.error("Error fetching tests:", error);
        });
    }
  }, [isVisible]);

  const printLists = () => {
    console.log("Symptoms: \n");
    for (const symptom of UserSymptoms) {
      console.log(
        symptom.name +
          ": " +
          symptom.startDate +
          " -> " +
          symptom.endDate +
          "\n"
      );
    }
    console.log("\n");
    console.log("Illnesses: \n");
    for (const illness of userIllnesses) {
      console.log(
        illness.name +
          ": " +
          illness.startDate +
          " -> " +
          illness.endDate +
          "\n"
      );
    }
    console.log("\n");

    console.log("Tests: \n");
    for (const test of userTests) {
      console.log(test.name + ": " + test.dateOccured + "\n");
    }
    console.log("\n");
  };

  //TODO: Implement save functionality
  /**
   * Takes collected user data and pushes the data either to local or cloud
   * storage, depends if user has cloud storage active
   *
   */
  const onSave = async () => {
    printLists();
    journalEntry = new JournalEntry(userSymptoms, userIllnesses, userTests);
    try {
      // Process symptoms
      for (const symptom of journalEntry.symptoms) {
        // const symptomId = await addSymptom(symptom.name);
        // console.log(`Added symptom with ID: ${symptomId}`);
        const latest_journal_entry = fetchLatestJournalEntry();
        j_id = latest_journal_entry.id++;
        const userSymptom = await addUserSymptom(j_id,symptom.name, symptom.startDate, symptom.endDate);
        console.log('Added User Symptom to :' + j_id);
      }

      // Process illnesses
      for (const illness of journalEntry.illnesses) {
        const illnessId = await addIllness(illness.name);
        console.log(`Added illness with ID: ${illnessId}`);
      }

      // Process tests
      for (const test of journalEntry.tests) {
        const testId = await addTest(test.name);
        console.log(`Added test with ID: ${testId}`);
      }

      // Add journal entry
      const journalEntryId = await addJournalEntry(new Date());
      console.log(`Added journal entry with ID: ${journalEntryId}`);

      // Fetch all journal entries after adding the new entry
      const entries = await fetchJournalEntries();
      console.log("Fetched journal entries:", entries);

      // Add journal to local database
      const journalId = await addJournal(
        journalEntry.symptoms.map((symptom) => symptom.name), // ?
        journalEntry.illnesses.map((illness) => illness.name),
        journalEntry.tests.map((test) => test.name),
        journalEntryId
      );
      console.log(`Added journal with ID: ${journalId}`);

      // Close the modal or perform any other post-save actions
      onClose();
    } catch (error) {
      console.error("Error saving journal entry:", error);
      alert("Failed to save journal entry. Please try again.");
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
            <Text style={styles.modalHeaderText}> Add Journal Entry</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name={"close"} size={28} color={"black"} />
            </TouchableOpacity>
          </View>

          <View style={styles.modalFormContent}>
            {/**Form content goes in this scope */}
            <View>
              <Text style={styles.SearchComponentHeader}>*Symptoms:</Text>
            </View>
            <View style={{ height: 180 }}>
              <SearchComponent
                searchData={symptoms}
                typeDataInputted={"symptoms"}
                updateList={setUserSymptoms}
              />
            </View>
            <View>
              <Text style={styles.SearchComponentHeader}>*Illnesses:</Text>
            </View>
            <View style={{ height: 180 }}>
              <SearchComponent
                searchData={illnesses}
                typeDataInputted={"illnesses"}
                updateList={setUserIllnesses}
              />
            </View>
            <View>
              <Text style={styles.SearchComponentHeader}>*Tests:</Text>
            </View>
            <View style={{ height: 180 }}>
              <SearchComponent
                searchData={tests}
                typeDataInputted={"tests"}
                updateList={setUserTests}
              />
            </View>
            {/**Save button that calls onSave function */}
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
    height: 700,
    borderRadius: 10,
    alignItems: "center",
    top: 15,
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
    bottom: 5,
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
