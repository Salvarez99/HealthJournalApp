/***************************************************************************************
 * Authors: Stephen Alvarez
 * Date: 5/1/2024
 * Code Version: 1.0
 *
 * Description:
 *  Renders a form that takes user input to fill out fields required for Journal Entries.
 * Adds gathered data to local DB tables when onSave() is triggered or clears data when form  
 * is closed without changing tables.
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
  fetchLatestJournalEntryJID, //Get the most recent JID added to table as {Integer}
  fetchJournalEntries, //Get all rows in journalEntry table
  addJournalEntry, //Add instance to journalEntry table
  fetchSymptoms, //Get all rows in symptom table
  addUserSymptom, //Add instance to userSymptom table
  fetchIllnesses, //Get all rows in illness table
  addUserIllness, //Add instance to userIllness table
  fetchTests, //Get all rows in test table
  addUserTest, //Add instance to userTest table
} from "../LocalStorage/LocalDatabase"; //imports localDB functions

const AddJournalEntryForm = ({ isVisible, onClose }) => {
  const [userSymptoms, setUserSymptoms] = useState([]); //list of userSymptoms, items are of type {Symptom}
  const [symptoms, setSymptoms] = useState([]); //list of symptoms to populate search data, items are of type {String}
  const [userIllnesses, setUserIllnesses] = useState([]);  //list of userIllnesses, items are of type {Illness}
  const [illnesses, setIllnesses] = useState([]); //list of illnesses to populate search data, items are of type {String}
  const [userTests, setUserTests] = useState([]);  //list of userTests, items are of type {TestAndLabworks}
  const [tests, setTests] = useState([]); //list of illnesses to populate search data, items are of type {String}
  let journalEntry = null;  //To be used to store data into an {JournalEntry} instance

  /**
   * Fetches data from symptom, illness and test tables when JournalEntryForm is visible
   */
  useEffect(() => {
    if (isVisible) {
      // Fetch preloaded illnesses store as list of {String}
      fetchIllnesses()
        .then((data) => {
          const illnessNames = data.map((illness) => illness.name);
          setIllnesses(illnessNames);
        })
        .catch((error) => {
          console.error("Error fetching illnesses:", error);
        });

      // Fetch preloaded symptoms store as list of {String}
      fetchSymptoms()
        .then((data) => {
          const symptomNames = data.map((symptom) => symptom.name);
          setSymptoms(symptomNames);
        })
        .catch((error) => {
          console.error("Error fetching symptoms:", error);
        });

      // Fetch preloaded tests store as list of {String}
      fetchTests()
        .then((data) => {
          const testNames = data.map((test) => test.name);
          setTests(testNames);
        })
        .catch((error) => {
          console.error("Error fetching tests:", error);
        });
    }
  }, [isVisible]);

  /**
   * Print User symptoms, illnesses, test to console
   */
  const printLists = () => {
    console.log("Symptoms: \n");
    for (const symptom of userSymptoms) {
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

  /**
   * Takes collected user data and pushes the data either to local storage
   */
  const onSave = async () => {
    printLists();
    journalEntry = new JournalEntry(userSymptoms, userIllnesses, userTests);
    try {
      //Fetch lastest JID added to journalEntry table
      const latest_journal_entry = fetchLatestJournalEntryJID();
      const date = new Date();
      const journalEntryId = await addJournalEntry(date.toLocaleDateString());
      console.log(`Added journal entry with ID: ${journalEntryId}`);

      //Iterate through each symptom and add them to userSymptom table
      for (const symptom of journalEntry.symptoms) {
        const userSymptom = await addUserSymptom(
          journalEntryId,
          symptom.name,
          symptom.startDate,
          symptom.endDate
        );
        console.log('Symptom added with ID: ' + journalEntryId);
      }

      //Iterate through each illness and add them to userSymptom table
      for (const illness of journalEntry.illnesses) {

        const illnessId = await addUserIllness(
          journalEntryId,
          illness.name,
          illness.startDate,
          illness.endDate
        );
        console.log('Illness added with ID: ' + journalEntryId);
      }

      //Iterate through each test and add them to userSymptom table
      for (const test of journalEntry.testAndLabworks) {

        const testId = await addUserTest(journalEntryId, test.name, test.dateOccured);
        console.log('Test added with ID: ' + journalEntryId);
      }

      // Fetch all journal entries after adding the new entry
      const entries = await fetchJournalEntries();

      // Close the modal or perform any other post-save actions
      onClose();
    } catch (error) {
      //If an error is encountered when saving, alert the user that saving has failed
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
              {/**Ensure searchData is a list of {String} */}
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
              {/**Ensure searchData is a list of {String} */}
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
              {/**Ensure searchData is a list of {String} */}
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
