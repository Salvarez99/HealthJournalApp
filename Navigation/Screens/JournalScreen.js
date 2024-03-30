import React , { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import QuickAddButton from '../../Components/QuickAddButton';
import AddJournalEntryForm from '../../InputForms/AddJournalEntryForm'
import AddAppointmentForm from '../../InputForms/AddAppointmentForm'
import AddMedicationForm from '../../InputForms/AddMedicationForm'

// for testing 
import PlaceholderForm from '../../InputForms/PlaceholderForm';

export default function JournalScreen({ navigation }) {
  const [isModalVisible, setIsModalVisible] = React.useState(false);  // vsible or not
  const [selectedModal, setSelectedModal] = React.useState(null); // track which model should displayed. 

  const [appointmentData, setAppointmentData] = React.useState(null); // take input from addappointmentFrom.js 
  const [appointments , setAppointments] = useState([]); // hook. 

  // create useEffect() and use dummy data for now 
  useEffect(()=>{
    // think of fetching appointments variable from the backend side 

    const dummyAppointments = [
      { id: 1, eventName: 'HealthCheckUp', date: '2024-04-01', startTime: '10:00 AM', endTime: '11:00 AM', location: 'Office' },
      { id: 2, eventName: 'BloodTestVisit', date: '2024-04-02', startTime: '12:00 PM', endTime: '1:00 PM', location: 'Restaurant' },
      { id: 3, eventName: 'BloodTestVisit', date: '2024-04-03', startTime: '12:00 PM', endTime: '1:00 PM', location: 'Restaurant' },
      { id: 4, eventName: 'BloodTestVisit', date: '2024-04-04', startTime: '12:00 PM', endTime: '1:00 PM', location: 'Restaurant' },
      { id: 5, eventName: 'BloodTestVisit', date: '2024-04-05', startTime: '12:00 PM', endTime: '1:00 PM', location: 'Restaurant' },
      { id: 6, eventName: 'BloodTestVisit', date: '2024-04-06', startTime: '12:00 PM', endTime: '1:00 PM', location: 'Restaurant' },
      { id: 7, eventName: 'BloodTestVisit', date: '2024-04-07', startTime: '12:00 PM', endTime: '1:00 PM', location: 'Restaurant' },
      { id: 8, eventName: 'BloodTestVisit', date: '2024-04-08', startTime: '12:00 PM', endTime: '1:00 PM', location: 'Restaurant' },
      { id: 9, eventName: 'BloodTestVisit', date: '2024-04-09', startTime: '12:00 PM', endTime: '1:00 PM', location: 'Restaurant' },
      { id: 10, eventName: 'BloodTestVisit', date: '2024-04-10', startTime: '12:00 PM', endTime: '1:00 PM', location: 'Restaurant' },
      { id: 11, eventName: 'BloodTestVisit', date: '2024-04-11', startTime: '12:00 PM', endTime: '1:00 PM', location: 'Restaurant' },
      { id: 12, eventName: 'BloodTestVisit', date: '2024-04-12', startTime: '12:00 PM', endTime: '1:00 PM', location: 'Restaurant' },
      { id: 13, eventName: 'BloodTestVisit', date: '2024-04-13', startTime: '12:00 PM', endTime: '1:00 PM', location: 'Restaurant' },
      { id: 14, eventName: 'BloodTestVisit', date: '2024-04-14', startTime: '12:00 PM', endTime: '1:00 PM', location: 'Restaurant' },
      { id: 15, eventName: 'BloodTestVisit', date: '2024-04-15', startTime: '12:00 PM', endTime: '1:00 PM', location: 'Restaurant' },
      { id: 16, eventName: 'BloodTestVisit', date: '2024-04-16', startTime: '12:00 PM', endTime: '1:00 PM', location: 'Restaurant' },
      { id: 17, eventName: 'BloodTestVisit', date: '2024-04-17', startTime: '12:00 PM', endTime: '1:00 PM', location: 'Restaurant' },
      { id: 18, eventName: 'BloodTestVisit', date: '2024-04-18', startTime: '12:00 PM', endTime: '1:00 PM', location: 'Restaurant' },
      { id: 19, eventName: 'BloodTestVisit', date: '2024-04-19', startTime: '12:00 PM', endTime: '1:00 PM', location: 'Restaurant' },
      { id: 20, eventName: 'BloodTestVisit', date: '2024-04-20', startTime: '12:00 PM', endTime: '1:00 PM', location: 'Restaurant' },
      
     
      //add more data as needed 
    ]; 

    // set appointments state 
    setAppointments(dummyAppointments);

  }, []); 

  // define fetchAppointmetnData() function with async 
  const fetchAppointmentData = async() =>{
    try{
      // change url with actrual backend API url. 
      //citation :https://dmitripavlutin.com/javascript-fetch-async-await/
      const response = await fetch('backend-api-url-placeholder'); 
      const data = await response.json();  // store response in data 
      setAppointments(data); // pass retrived data 

    }catch(error){
      console.log('fail to fetch data from appointment database : ', error); 
    }
  }; 

  // after setting up backend API 
  useEffect(()=>{
    //fetch appointmetn data from backend API 
    fetchAppointmentData(); 
  }, []);


  const openModal1 = () => {
    setSelectedModal('AddAppointmentForm');
    setIsModalVisible(true);
  };

  const openModal2 = () => {
    setSelectedModal('AddMedicationForm');
    setIsModalVisible(true);
  };

  const openModal3 = () => {
    setSelectedModal('AddJournalEntryForm');
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  // handle input data parameter from AddJournalEntryForm.js 
  const saveAppointmentData = (data) =>{
    setAppointmentData(data);
    setIsModalVisible(false);
  };

  // handel when user click journal screen entry >> display JournalTitle.js page 
  const handleAppointmentPress =(appointment) =>{
    navigation.navigate('JournalTitle', {appointment });
  };

  // render appointment item (prepare for displaying)
  const renderAppointmentItem = ({item}) =>(
    <TouchableOpacity style={styles.appointmetnItem} onPress={()=>handleAppointmentPress(item)}>
          <View style={styles.appointmentInfo}>
            <Text style={styles.JournalTitle}>{`Journal #${item.id}`}</Text>
            <Text style={styles.JournalDate}>{item.date}</Text>
        </View>
        <Text style={styles.horizontalLine}></Text>
    </TouchableOpacity>
  );

  // Define modal components with their names
  const modalComponents = [
    { name: 'Add Appointment', openModal: openModal1 },
    { name: 'Add Medication', openModal: openModal2 },
    { name: 'Add Journal Entry', openModal: openModal3 },
    // Add more modal components as needed
  ];

  const renderSelectedModal = () => {
    switch (selectedModal) {
      case 'AddAppointmentForm':
       //return <PlaceholderForm isVisible={isModalVisible} onClose={closeModal} />;    // for testing 
        return <AddAppointmentForm isVisible={isModalVisible} onClose={closeModal} />;
      case 'AddMedicationForm':
        return <AddMedicationForm isVisible={isModalVisible} onClose={closeModal} />;
        case 'AddJournalEntryForm':
            return <AddJournalEntryForm isVisible={isModalVisible} onClose={closeModal} />;
            
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
     
              <View style={styles.mainContent}>
              {/* Put your content in this view */}

              {/* display add appointment data */}
              {appointmentData &&(
                <View style={styles.appointmentDataContainer}> 
                        <Text>Display Saved Appointment Data:</Text>
                        <Text>Event name: {appointmentData.eventName} </Text> {/* take parameter update! */}
                        <Text>Date: {appointmentData.date} </Text>
                        <Text>Start time: {appointmentData.startTime}</Text>
                        <Text>End time: {appointmentData.endTime} </Text>
                        <Text>Location : {appointmentData.location}</Text>
                </View>
              )}
              {/** show list of saved appointment records */}
              <FlatList 
                    
                    data={appointments}
                    renderItem={renderAppointmentItem}
                    keyExtractor={(item)=> item.id.toString()} 
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom : 50,
  },
  title: {
    paddingTop : 10,
    fontSize: 26,
    fontWeight: 'bold',
  },
  quickAddButtonContainer: {
    position: 'absolute',
    bottom: '2%',
    left: '4%',
  },
  //
  appointmentDataContainer : {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 20, // Add horizontal padding
  },
  appointmentList: {
    flex: 1,
    horizontal : '100%',
    paddingVertical : 20, // put paddding in vertical way 
  },
  appointmentItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row', // Align children horizontally
   // alignItems: 'flex-start', // Align children vertically
   paddingRight : 100,
    justifyContent: 'space-between', // Align children evenly
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',

  },


  // horizontal line 
  horizontalLine : {
    flex: 1,  // take full screen 
    height :1, 
    backgroundColor: '#000000', 
    marginTop :10,
    marginBottom :10,
    
  },
  // Journal# size 
  appointmentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop : 25, 
    paddingBottom : 25, 
    paddingRight : 7,
},
  JournalTitle :{
    fontSize: 18,
    //fontWeight: 'bold',
    paddingLeft: 20,
},
JournalDate: {
    fontSize: 14,
    paddingLeft: 130,
    color: '#555',
},
  horizontalListContent : {
    horizontal : '100%',
    width : '100',
    marginTop: 10,
    marginBottom: 10,
  }
});
