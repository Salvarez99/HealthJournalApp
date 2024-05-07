import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
} from "react-native";

import QuickAddButton from "../../Components/QuickAddButton";
import AddJournalEntryForm from "../../InputForms/AddJournalEntryForm";
import AddAppointmentForm from "../../InputForms/AddAppointmentForm";
import AddMedicationForm from "../../InputForms/AddMedicationForm";
import {fetchJournalEntries} from "../../LocalStorage/LocalDatabase";

export default function JournalScreen({ navigation }) {
  const [isModalVisible, setIsModalVisible] = React.useState(false); // vsible or not
  const [selectedModal, setSelectedModal] = React.useState(null); // track which model should displayed.
  const [journalEntries, setJournalEntries] = useState([]); //empty list


  const fetchJournalData = async () => {
    try {
      const entries = await fetchJournalEntries(); // Fetch journal entries with id and date
      setJournalEntries(entries);
      // console.log('Fetched journal entries:', entries); 
    } catch (error) {
      console.error('Failed to fetch journal entries:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchJournalData();
    }, [])
  );
  const openModal1 = () => {
    setSelectedModal("AddAppointmentForm");
    setIsModalVisible(true);
  };

  const openModal2 = () => {
    setSelectedModal("AddMedicationForm");
    setIsModalVisible(true);
  };

  const openModal3 = () => {
    setSelectedModal("AddJournalEntryForm");
    setIsModalVisible(true);
  };

  const closeModal = () => {
    //refreshes the page to update when a new jounral is added
    fetchJournalData();
    setIsModalVisible(false);
    fetchJournalData();
  };

  // handle when user click journal screen entry >> display JournalTitle.js page
  const handleJournalEntryPress = (journalID) => {
    navigation.navigate("JournalTitle", { journalId: journalID }); //https://youtu.be/oBAOr1OswkQ?si=NQ_XdTnzKk3t8xGd
  };

  // render journal date on journal screen.
  // sort date in each symptom list , illnes list, test and labwork list.
  const displayStartDate = (item) => {
    if (item.Symptom && item.Symptom.length > 0) {
      // citation: sorting https://stackoverflow.com/questions/47071623/sort-by-closest-date-to-dates-which-have-occured-and-will-occur
      // compare starting date
      item.Symptom.sort(function (a, b) {
        //a.startDate is string type , conver to Date object.
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);
        return Math.abs(Date.now() - dateA) - Math.abs(Date.now() - dateB);
      });

      // Log the sorted Symptom array (for debugging)
      // console.log(item.Symptom);
      return item.Symptom[0].startDate;
    }

    if (item.Illness && item.Illness.length > 0) {
      item.Illness.sort(function (a, b) {
        //a.startDate is string type , conver to Date object.
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);
        return Math.abs(Date.now() - dateA) - Math.abs(Date.now() - dateB);
      });

      // Log the sorted Illness array (for debugging)
      // console.log(item.Illness);
      return item.Illness[0].startDate;
    }

    if (item.TestsAndLabWorks && item.TestsAndLabWorks.length > 0) {
      // Sort TestsAndLabWorks array based on dateOccurred
      item.TestsAndLabWorks.sort((a, b) => {
        const dateA = new Date(a.dateOccurred);
        const dateB = new Date(b.dateOccurred);
        return Math.abs(Date.now() - dateA) - Math.abs(Date.now() - dateB);
      });

      // Return the dateOccurred of the first item in TestsAndLabWorks array
      // console.log(item.TestsAndLabWorks);
      return item.TestsAndLabWorks[0].dateOccurred;
    }

    // case : all three array is empty
    return null;
  };

  // calculate each entry's difference in date ex) current date 04-25 - storedStartDate 04-23 return 2
  const calculateDateDifference = (startDate) => {
    const storedStartDate = new Date(startDate);
    return Math.abs(Date.now() - storedStartDate);
  };

  // render appointment item (prepare for displaying)
  const renderJournalItem = ({ item }) => {
  
    // render return with touchable opacity >> linked to journaltitle.js
    return (
      <TouchableOpacity
        style={styles.journalButtonStyle}
        onPress={() => handleJournalEntryPress(item.id)}
      >
        <Text style={styles.JournalTitle}>{`Journal ${item.id}`}</Text>
        <Text style={styles.JournalDate}>{item.primaryDate}</Text>
        <View style={styles.horizontalLine}></View>
      </TouchableOpacity>
    );
  };

  // Defined modal components with their names
  const modalComponents = [
    { name: "Add Appointment", openModal: openModal1 },
    { name: "Add Medication", openModal: openModal2 },
    { name: "Add Journal Entry", openModal: openModal3 },
  ];

  const renderSelectedModal = () => {
    switch (selectedModal) {
      case "AddAppointmentForm":
        return (
          <AddAppointmentForm isVisible={isModalVisible} onClose={closeModal} />
        );
      case "AddMedicationForm":
        return (
          <AddMedicationForm isVisible={isModalVisible} onClose={closeModal} />
        );
      case "AddJournalEntryForm":
        return (
          <AddJournalEntryForm
            isVisible={isModalVisible}
            onClose={closeModal}
          />
        );
      default:
        return null;
    }
  };



  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>

        {/** show list of saved appointment records */}
        <FlatList
          data={journalEntries}
          renderItem={renderJournalItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/*Below is the quick add button */}
      <View style={styles.quickAddButtonContainer}>
        <QuickAddButton modalComponents={modalComponents} />
      </View>

      {renderSelectedModal()}
    </View>
  );
}

export function useForceUpdate() {
  const [, setValue] = useState(0); // Use state to trigger re-render
  return () => setValue((value) => value + 1); // Update state to trigger re-render
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
  },
  quickAddButtonContainer: {
    position: "absolute",
    bottom: "2%",
    left: "4%",
  },
  journalButtonStyle: {
    flexDirection: "row", // Align children horizontally
    justifyContent: "space-between", // Align children evenly
    padding: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    ...Platform.select({
      ios: {
        fontFamily: "Times New Roman", // Set font family to Times New Roman
      },
    }),
  },
  JournalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 20,
    ...Platform.select({
      ios: {
        fontFamily: "Times New Roman", // Set font family to Times New Roman
      },
    }),
  },
  JournalDate: {
    fontSize: 14,
    paddingTop: 3,
    paddingLeft: 150,
    color: "#555",
    ...Platform.select({
      ios: {
        fontFamily: "Times New Roman", // Set font family to Times New Roman
      },
    }),
  },
});
