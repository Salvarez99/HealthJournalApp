import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet, FlatList, Platform } from "react-native";
import QuickAddButton from "../../Components/QuickAddButton";
import AddJournalEntryForm from "../../InputForms/AddJournalEntryForm";
import AddAppointmentForm from "../../InputForms/AddAppointmentForm";
import AddMedicationForm from "../../InputForms/AddMedicationForm";
import { fetchMedicineEntries } from "../../LocalStorage/LocalDatabase";
// define backend API >> fetch data from backend ex fetch >> parse and set data to display

export default function MedicationScreen({ navigation }) {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectedModal, setSelectedModal] = React.useState(null);
  const [medications, setMedications] = useState([]);
  
// use predefined fetch function to collect data from database.
  const fetchMedicationData = async () => {
    try {
      const medData = await fetchMedicineEntries();
      setMedications(medData);
    } catch (error) {
      console.error("Failed to fetch medication data:", error);
    }
    
  };
  useFocusEffect(
    useCallback(() => {
      fetchMedicationData();  
    }, [])
  );

  useEffect(() => {
    fetchMedicationData();
  }, []);

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
    setIsModalVisible(false);
    //freshed the page to update any changes made 
    fetchMedicationData();
  };

  const modalComponents = [
    { name: "Add Appointment", openModal: openModal1 },
    { name: "Add Medication", openModal: openModal2 },
    { name: "Add Journal Entry", openModal: openModal3 },
  ];

   // convert received list of int into appropriate frequency (string type) ex) 0,1 convert to Sunday Monday
   const convertFrequencyList = (frequency) => {
    const days = ["S", "M", "T", "W", "TH", "F", "S"];
    let outputList = [];
    for (let i = 0; i < frequency.length; i++) {
      if (frequency[i] !== "") {
        outputList.push(days[frequency[i]]);
      }
    }
    return outputList.join(" ");
  };
// render each entry of medication list before displaying.
  const renderMedicationItem = ({ item }) => (
    <View style={styles.medicationItem}>
      <View style={{alignContent : 'center', justifyContent : 'center'}}>
        <Text style={styles.medicationName}>{`${item.medicineName}`}</Text>
      </View>

      <View style={styles.rightContent}>
        <Text style={styles.medicationDetail}>{`Dosage: ${item.dosage}`}</Text>
        <Text style={styles.medicationDetail}>{`Dosage Schedule: ${item.dosageSchedule}`}</Text>
        <Text style={styles.medicationDetail}>{`Frequency: ${convertFrequencyList(item.frequency)}`}</Text>
      </View>
    </View>
  );

// rendering for output.
  const renderOutput = () => {
    return (
      <FlatList
        data={medications}
        renderItem={renderMedicationItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.flatListContainer}
        horizontal={false}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const renderSelectedModal = () => {
    if (!selectedModal) {
      return null;
    }

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
        {renderOutput()}
      </View>

      <View style={styles.quickAddButtonContainer}>
        <QuickAddButton modalComponents={modalComponents} />
      </View>

      {renderSelectedModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  quickAddButtonContainer: {
    position: "absolute",
    bottom: "2%",
    left: "4%",
  },

  flatListContainer: {
    horizontal: "100%",
    flex: 1, // take entire screen vertically.
  },

  medicationItem: {
    flexDirection: "row",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  rightContent: {
    paddingLeft: 100,
    paddingTop: 0,
  },

  medicationName: {
    fontWeight: "bold",
    fontSize: 20,
    ...Platform.select({
      ios: {
        fontFamily: "Times New Roman", // Set font family to Times New Roman
      },
    }),
  },
  medicationDetail: {
    ...Platform.select({
      ios: {
        fontFamily: "Times New Roman", // Set font family to Times New Roman
      },
    }),
  },
});