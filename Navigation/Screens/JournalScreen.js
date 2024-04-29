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

// for testing
import PlaceholderForm from "../../InputForms/PlaceholderForm";
import Symptom from "../../Classes/Symptom";

export default function JournalScreen({ navigation }) {
  const [isModalVisible, setIsModalVisible] = React.useState(false); // vsible or not
  const [selectedModal, setSelectedModal] = React.useState(null); // track which model should displayed.

  //const [appointmentData, setAppointmentData] = React.useState(null); // for data fetched from backend url take input from addappointmentFrom.js
  const [appointments, setAppointments] = useState([]); // hook. for dummy datas

  // create useEffect() and use dummy data for now
  useEffect(() => {
    // think of fetching appointments variable from the backend side

    const dummyAppointments = [
      //dummy data 1
      {
        id: 1,
        Symptom: [
          { name: "Fever", startDate: "04-01-2024", endDate: "04-09-2024" },
          { name: "Headache", startDate: "04-03-2024", endDate: "04-19-2024" },
          { name: "Tired", startDate: "04-15-2024", endDate: "04-29-2024" },
        ],
        Illness: [
          { name: "Cold", startDate: "04-05-2024", endDate: "04-09-2024" },
          { name: "Dizziness", startDate: "04-01-2024", endDate: "04-09-2024" },
          { name: "Fever", startDate: "04-03-2024", endDate: "04-09-2024" },
          { name: "Fever", startDate: "04-12-2024", endDate: "04-09-2024" },
         
        ],
        TestsAndLabWorks: [
          { name: "Blood Test", dateOccurred: "04-10-2024" },
          { name: "X-Ray", dateOccurred: "04-17-2024" },
        ],
      },

      {
        id: 2,
        Symptom: [
          
        ],
        Illness: [
          {
            name: "Common Cold",
            startDate: "03-01-2024",
            endDate: "04-09-2024",
          },
        ],
        TestsAndLabWorks: [
          { name: "Blood Test", dateOccurred: "04-10-2024" },
          { name: "X-Ray", dateOccurred: "04-10-2024" },
        ],
      },

      {
        id: 3,
        Symptom: [],
        Illness: [],
        TestsAndLabWorks: [
          { name: "Blood Test", dateOccurred: "04-23-2024" },
          { name: "X-Ray", dateOccurred: "04-24-2024" },
        ],
      },

      {
        id: 4,
        Symptom: [],
        Illness: [
          {
            name: "Common Cold",
            startDate: "04-11-2024",
            endDate: "04-17-2024",
          },
        ],
        TestsAndLabWorks: [],
      },
      {
        id: 5,
        Symptom: [],
        Illness: [
          {
            name: "Common Cold",
            startDate: "04-26-2024",
            endDate: "04-17-2024",
          },
        ],
        TestsAndLabWorks: [],
      },
      {
        id: 6,
        Symptom: [
          { name: "Fever", startDate: "04-30-2024", endDate: "04-09-2024" },
          { name: "Headache", startDate: "04-03-2024", endDate: "04-19-2024" },
          { name: "Tired", startDate: "04-02-2024", endDate: "04-29-2024" },
        ],
        Illness: [
          { name: "Cold", startDate: "04-05-2024", endDate: "04-09-2024" },
          { name: "Dizziness", startDate: "04-01-2024", endDate: "04-09-2024" },
          { name: "Fever", startDate: "04-03-2024", endDate: "04-09-2024" },
          { name: "Fever", startDate: "04-12-2024", endDate: "04-09-2024" },
         
        ],
        TestsAndLabWorks: [
          { name: "Blood Test", dateOccurred: "04-10-2024" },
          { name: "X-Ray", dateOccurred: "04-17-2024" },
        ],
      },

      {
        id: 7,
        Symptom: [
          { name: "Fever", startDate: "01-01-2024", endDate: "04-09-2024" },
          { name: "Headache", startDate: "03-03-2024", endDate: "04-19-2024" },
          { name: "Tired", startDate: "03-15-2024", endDate: "04-29-2024" },
        ],
        Illness: [
          { name: "Cold", startDate: "04-05-2024", endDate: "04-09-2024" },
          { name: "Dizziness", startDate: "04-01-2024", endDate: "04-09-2024" },
          { name: "Fever", startDate: "04-03-2024", endDate: "04-09-2024" },
          { name: "Fever", startDate: "04-12-2024", endDate: "04-09-2024" },
         
        ],
        TestsAndLabWorks: [
          { name: "Blood Test", dateOccurred: "04-10-2024" },
          { name: "X-Ray", dateOccurred: "04-17-2024" },
        ],
      },

      

     



  

      // add more data as needed list of string symptom, illness , test and labworks.
    ];

    // set appointments state
    setAppointments(dummyAppointments);
  }, []);

  // define fetchAppointmetnData() function with async
  const fetchAppointmentData = async () => {
    try {
      // change url with actrual backend API url.
      //citation :https://dmitripavlutin.com/javascript-fetch-async-await/
      const response = await fetch("backend-api-url-placeholder");
      const data = await response.json(); // store response in data
      setAppointments(data); // pass retrived data
    } catch (error) {
      console.log("fail to fetch data from appointment database : ", error);
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
    setAppointments(data); // setAppointmentData(data)
    setIsModalVisible(false);
  };

  // handel when user click journal screen entry >> display JournalTitle.js page
  const handleAppointmentPress = (arryOfAppointmentInfo) => {
    navigation.navigate("JournalTitle", { arryOfAppointmentInfo }); //https://youtu.be/oBAOr1OswkQ?si=NQ_XdTnzKk3t8xGd
  };

  // render journal date on journal screen.
  // sort date in each symptom list , illnes list, test and labwork list.
  const displayStartDate = (item) => {
    if (item.Symptom && item.Symptom.length > 0) {
      // citation: sorting https://stackoverflow.com/questions/47071623/sort-by-closest-date-to-dates-which-have-occured-and-will-occur
      // compare starting date 
      item.Symptom.sort(function(a, b) {
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

      item.Illness.sort(function(a, b) {
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
 
  // Determine the source of data (dummy or fetched appointments)
  const sourceAppointments = appointments.length > 0 ? appointments : dummyAppointments;

  // Sort the appointments based on date difference
  // citation : https://stackoverflow.com/questions/47071623/sort-by-closest-date-to-dates-which-have-occured-and-will-occur
  sourceAppointments.sort((a, b) => {
   
    // Calculate date difference for both items
    const differenceA = calculateDateDifference(displayStartDate(a));
    const differenceB = calculateDateDifference(displayStartDate(b));
    return differenceA - differenceB; // sort by ascending order , nearest item fist comes.
  });

  // render return with touchable opacity >> linked to journaltitle.js 
  return (
    <TouchableOpacity
      style={styles.journalButtonStyle}
      onPress={() => handleAppointmentPress(item)}
    >
      <Text style={styles.JournalTitle}>{`Journal ${item.id}`}</Text>
      <Text style={styles.JournalDate}>{displayStartDate(item)}</Text>
      <View style={styles.horizontalLine}></View>
    </TouchableOpacity>
  );
};


  // Define modal components with their names
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
        {/* Put your content in this view */}

        {/** show list of saved appointment records */}
        <FlatList
          data={appointments}
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
    paddingTop : 3,
    paddingLeft: 150,
    color: "#555",
    ...Platform.select({
      ios: {
        fontFamily: "Times New Roman", // Set font family to Times New Roman
      },
    }),
  },
});
