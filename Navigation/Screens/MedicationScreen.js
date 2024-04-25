import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Platform } from "react-native";
import QuickAddButton from "../../Components/QuickAddButton";
import AddJournalEntryForm from "../../InputForms/AddJournalEntryForm";
import AddAppointmentForm from "../../InputForms/AddAppointmentForm";
import AddMedicationForm from "../../InputForms/AddMedicationForm";
import { fetchLocalData } from "../../LocalStorage/fetchLocal";
// define backend API >> fetch data from backend ex fetch >> parse and set data to display

export default function MedicationScreen({ navigation }) {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectedModal, setSelectedModal] = React.useState(null);
  //  for handleing medicatoin input information that retrived from addmedicationform.js >> backend >> medicationscree.js
  const [medications, setMedications] = useState([]);

  // Fetch local data
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchLocalData();
      if (data) {
        setMedications(data.medicines);
      }
    };
    fetchData();
  }, []);

  // define fetchMeidcationData() function
  const fetchMedicationData = async () => {
    try {
      // get backend API endpoint
      //citation : https://dmitripavlutin.com/javascript-fetch-async-await/
      const request = await fetch("take-backend-api-url"); // update this with actual link
      const data = -(await Response.json());
      setMedications(data); // get data from backend api and set it with setMedications() state hook
    } catch (error) {
      console.log("fail to fatch medication data : ", error);
    }
  };

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
  };

  // Define modal components with their names
  const modalComponents = [
    { name: "Add Appointment", openModal: openModal1 },
    { name: "Add Medication", openModal: openModal2 },
    { name: "Add Journal Entry", openModal: openModal3 },
    // Add more modal components as needed
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

  // convert received list of int into appropriate frequency (string type) ex) 0,1 conver to Sunday Monday
  const convertFrequencyList = (frequency) => {
    const days = ["S", "M", "T", "W", "TH", "F", "S"];
    let outputList = [];
    for (let i = 0; i < frequency.length; i++) {
      outputList.push(days[frequency[i]]);
    }
    return outputList.join(", ");
  };

  // create what we are going to render / display to screen.
  const renderMedicationItem = ({ item }) => (
    <View style={styles.medicationItem}>
      <Text style={styles.medicationName}>{item.medicine_name}</Text>
      <View style={styles.rightContent}>
        <Text style={styles.medicationDetail}>{`Dosage: ${item.dosage}`}</Text>
        <Text style={styles.medicationDetail}>{`Dosage Schedule: ${item.dosage_schedule}`}</Text>
        <Text style={styles.medicationDetail}>{`Frequency: ${item.frequency}`}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        {/* Put your content in this view */}

        {/* display add medication data */}

        {/** show list of saved medication records using rendermedicdationItem()  */}
        <FlatList
          data={medications}
          renderItem={renderMedicationItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.flatListContainer} // use scroll view style.
          horizontal={false} // don't move horizontally
          showsVerticalScrollIndicator={false}
        />
      </View>
      {/* Your content ends here */}

      {/*Below is the quick add button */}
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
    ...Platform.select({
      ios: {
        fontFamily: "Times New Roman", // Set font family to Times New Roman
      },
    }),
    fontSize: 15,
  },
  medicationDetail: {
    ...Platform.select({
      ios: {
        fontFamily: "Times New Roman", // Set font family to Times New Roman
      },
    }),
  },
});
