import React, { useState, useEffect } from "react";
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
import JournalTitle from "./JournalTitle";
import * as SQLite from 'expo-sqlite';
//import { openData, closeData } from "./LocalStorage/LocalDatabase";
import { AppState } from "react-native";
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import { fetchAppointments, clearAppointments, fetchJournals } from "../../LocalStorage/LocalDatabase";
import { useFocusEffect} from "@react-navigation/native";
// for testing
import PlaceholderForm from "../../InputForms/PlaceholderForm";


export default function JournalScreen({ navigation }) {
  const [isModalVisible, setIsModalVisible] = React.useState(false); // vsible or not
  const [selectedModal, setSelectedModal] = React.useState(null); // track which model should displayed.

  //const [appointmentData, setAppointmentData] = React.useState(null); // for data fetched from backend url take input from addappointmentFrom.js
  const [appointments, setAppointments] = useState([]); // hook. for dummy datas
  const [journals, setJournals] = useState([]);
  

  const fetchJournalsFromDB = async () => {
    try {
      const journalsFromDB = await fetchJournals();
      setJournals(journalsFromDB);
      console.log("journals successfully fetched?");
    } catch (error) {
      console.error('Error fetching journals', error);
    }
  };

  // create useEffect() and use dummy data for now
  useEffect(() => {
    // think of fetching appointments variable from the backend side
    const fetchAppointmentsFromDB = async()=> {
      try{ 
        const appointmentsFromDB = await fetchAppointments();
        setAppointments(appointmentsFromDB);
        console.log("Appointments successfully fetched?");
      } catch(error){
        console.error('Error fetching appointments', error);
      }
    };

    const fetchJournalsFromDB = async()=> {
      try{ 
        const journalsFromDB = await fetchJournals();
        setJournals(journalsFromDB);
        console.log("journals successfully fetched?");
      } catch(error){
        console.error('Error fetching journals', error);
      }
    };

    const clearAllData = async () => {
      try {
        const rowsAffected = await clearAppointments();
        console.log('Number of rows affected:', rowsAffected);
      } catch (error) {
        console.error('Error clearing appointments:', error);
      }
    };
    fetchJournalsFromDB();
  }, []);

  useFocusEffect(
    
    React.useCallback(() => {

      const fetchJournalsFromDB = async()=> {
        try{ 
          const journalsFromDB = await fetchJournals();
          setJournals(journalsFromDB);
          console.log("journals successfully fetched?");
        } catch(error){
          console.error('Error fetching journals', error);
        }
      };

      fetchJournalsFromDB(); // Fetch journals data when screen is focused
    }, [])
  );

  // define fetchAppointmetnData() function with async
  const fetchAppointmentData = async () => {
    try {
      // change url with actrual backend API url.
      //citation :https://dmitripavlutin.com/javascript-fetch-async-await/
      const response = await fetch("backend-api-url-placeholder");
      const data = await response.json(); // store response in data
      setAppointments(data); // pass retrived data
    } catch (error) {
      //console.log("fail to fetch data from appointment database : ", error);
    }
  };

  // after setting up backend API
  useEffect(() => {
    // citation : https://www.guvi.in/blog/how-to-fetch-data-using-api-in-react/
    //fetch appointmetn data from backend API
    fetchAppointmentData();
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
  };

  // handle input data parameter from AddJournalEntryForm.js
  const saveAppointmentData = (data) => {
    fetchAppointmentData(); // setAppointmentData(data)
    setIsModalVisible(false);
  };

  // handel when user click journal screen entry >> display JournalTitle.js page
  const handleAppointmentPress = (arryOfAppointmentInfo, item) => {
    console.log(item.id);
    navigation.navigate("JournalTitle", { arryOfAppointmentInfo, item }); //https://youtu.be/oBAOr1OswkQ?si=NQ_XdTnzKk3t8xGd
  };

  // render journal date on journal screen.
  const displayStartDate = (item) => {
    if (item.Symptom && item.Symptom.length > 0) {
      return item.Symptom[0].startDate;
    } else if (item.Illness && item.Illness.length > 0) {
      return item.Illness[0].startDate;
    } else if (item.TestsAndLabWorks && item.TestsAndLabWorks.length > 0) {
      return item.TestsAndLabWorks[0].dateOccurred;
    }
  };

  const displayAppointmentDetails = (item) => {
    return `${item.symptomName}`;
  };

  // render appointment item (prepare for displaying)
  const renderAppointmentItem = ({ item }) => (
    <TouchableOpacity
    style={styles.appointmentItem}
    onPress={() => handleAppointmentPress(item,item)}
  >
    <View style={styles.appointmentInfo}>
      <Text style={styles.JournalTitle}>{`Journal: ${item.id}`}</Text>
      <Text style={styles.JournalDate}>{displayAppointmentDetails(item)}</Text>
    </View>
    <Text style={styles.horizontalLine}></Text>
  </TouchableOpacity>
);

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
        //return <PlaceholderForm isVisible={isModalVisible} onClose={closeModal} />;    // for testing
        return (
          <AddAppointmentForm isVisible={isModalVisible} onClose={closeModal} navigation={navigation} />
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
            navigation={navigation}
            onSaveSuccess={()=> {
              fetchJournalsFromDB();
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        {/* Put your content in this view */}

        {/* display add appointment data */}

        {/** show list of saved appointment records */}
        <FlatList
          data={journals}
          renderItem={renderAppointmentItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.horizontalListContent}
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

const styles = StyleSheet.create({
  // add scrollContent style!

  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
  },
  title: {
    paddingTop: 10,
    fontSize: 26,
    fontWeight: "bold",
  },
  quickAddButtonContainer: {
    position: "absolute",
    bottom: "2%",
    left: "4%",
  },
  //
  appointmentDataContainer: {
    paddingLeft: 20,
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 20, // Add horizontal padding
  },
  appointmentList: {
    flex: 1,
    horizontal: "100%",
    paddingVertical: 20, // put paddding in vertical way
  },
  appointmentItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row", // Align children horizontally
    // alignItems: 'flex-start', // Align children vertically
    paddingRight: 100,
    justifyContent: "space-between", // Align children evenly
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },

  // horizontal line
  horizontalLine: {
    flex: 1, // take full screen
    height: 1,
    backgroundColor: "#000000",
    marginTop: 10,
    marginBottom: 10,
  },
  // Journal# size
  appointmentInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 25,
    paddingBottom: 25,
    paddingRight: 7,
    ...Platform.select({
      ios: {
        fontFamily: "Times New Roman", // Set font family to Times New Roman
      },
    }),
  },
  JournalTitle: {
    fontSize: 17,
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
    paddingLeft: 150,
    paddingRight: 20,
    color: "#555",
    ...Platform.select({
      ios: {
        fontFamily: "Times New Roman", // Set font family to Times New Roman
      },
    }),
  },
  horizontalListContent: {
    horizontal: "100%",
    width: "100",
    marginTop: 10,
    marginBottom: 10,
  },
});
