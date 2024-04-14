import React , { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import QuickAddButton from '../../Components/QuickAddButton';
import AddJournalEntryForm from '../../InputForms/AddJournalEntryForm'
import AddAppointmentForm from '../../InputForms/AddAppointmentForm'
import AddMedicationForm from '../../InputForms/AddMedicationForm'
import JournalTitle from './JournalTitle';

// for testing 
import PlaceholderForm from '../../InputForms/PlaceholderForm';

export default function JournalScreen({ navigation }) {
  const [isModalVisible, setIsModalVisible] = React.useState(false);  // vsible or not
  const [selectedModal, setSelectedModal] = React.useState(null); // track which model should displayed. 

  //const [appointmentData, setAppointmentData] = React.useState(null); // for data fetched from backend url take input from addappointmentFrom.js 
  const [appointments , setAppointments] = useState([]); // hook. for dummy datas 

  // create useEffect() and use dummy data for now 
  useEffect(()=>{
    // think of fetching appointments variable from the backend side 

    const dummyAppointments = [
      //dummy data 1 
      {
        id: 1,
        Symptom: [
          { name: 'Fever',  startDate: '04-08-2024', endDate: '04-09-2024'  },
          { name: 'Headache',  startDate: '04-03-2024', endDate: '04-19-2024'  },
          { name: 'Tired',  startDate: '04-08-2024', endDate: '04-29-2024'  },
        ],
        Illness: [
          { name: 'Cold', startDate: '04-01-2024', endDate: '04-09-2024'},
          { name: 'Dizziness', startDate: '04-01-2024', endDate: '04-09-2024'},
          { name: 'Fever', startDate: '04-01-2024', endDate: '04-09-2024'},
          { name: 'Sore throat', startDate: '04-01-2024', endDate: '04-09-2024'},
          { name: 'Stomach ache', startDate: '04-01-2024', endDate: '04-09-2024'},
        ],
        TestsAndLabWorks: [
          { name: 'Blood Test', dateOccurred: '04-10-2024'},
          { name: 'X-Ray', dateOccurred: '04-10-2024' },
        ],
      },                                                                                                                                                                               

      {
        id: 2,
        Symptom: [
         
        ],
        Illness: [
          { name: 'Common Cold', startDate: '04-01-2024', endDate: '04-09-2024'},
        ],
        TestsAndLabWorks: [
          { name: 'Blood Test', dateOccurred: '04-10-2024'},
          { name: 'X-Ray', dateOccurred: '04-10-2024' },
        ],
      },

      {
        id: 3,
        Symptom: [
         
        ],
        Illness: [
          
        ],
        TestsAndLabWorks: [
          { name: 'Blood Test', dateOccurred: '04-10-2024'},
          { name: 'X-Ray', dateOccurred: '04-10-2024' },
        ],
      },

      {
        id: 4,
        Symptom: [
          
        ],
        Illness: [
          { name: 'Common Cold', startDate: '04-01-2024', endDate: '04-09-2024'},
        ],
        TestsAndLabWorks: [
          
        ],
      },

      {
        id: 5,
        Symptom: [
          { name: 'Back Pain',  startDate: '04-24-2024', endDate: '04-09-2024'  },
          { name: 'Headache',  startDate: '04-01-2024', endDate: '04-09-2024'  },
        ],
        Illness: [
          { name: 'Common Cold', startDate: '04-01-2024', endDate: '04-09-2024'},
        ],
        TestsAndLabWorks: [
          { name: 'Blood Test', dateOccurred: '04-10-2024'},
          { name: 'X-Ray', dateOccurred: '04-10-2024' },
        ],
      },

      {
        id: 6,
        Symptom: [
          { name: 'Back Pain',  startDate: '04-15-2024', endDate: '04-09-2024'  },
          { name: 'Headache',  startDate: '04-01-2024', endDate: '04-09-2024'  },
        ],
        Illness: [
          { name: 'Common Cold', startDate: '04-01-2024', endDate: '04-09-2024'},
        ],
        TestsAndLabWorks: [
          { name: 'Blood Test', dateOccurred: '04-10-2024'},
          { name: 'X-Ray', dateOccurred: '04-10-2024' },
        ],
      },

      {
        id: 7,
        Symptom: [
          { name: 'Back Pain',  startDate: '04-18-2024', endDate: '04-09-2024'  },
        ],
        Illness: [
         
        ],
        TestsAndLabWorks: [
          { name: 'Blood Test', dateOccurred: '04-10-2024'},
          { name: 'X-Ray', dateOccurred: '04-10-2024' },
        ],
      },


      // test 
      {
        id: 8,
        Symptom: [
          { name: 'Back Pain',  startDate: '05-13-2024', endDate: '04-09-2024'  },
          { name: 'Headache',  startDate: '04-01-2024', endDate: '04-09-2024'  },
        ],
        Illness: [
          { name: 'Common Cold', startDate: '04-01-2024', endDate: '04-09-2024'},
        ],
        TestsAndLabWorks: [
          { name: 'Blood Test', dateOccurred: '04-10-2024'},
          { name: 'X-Ray', dateOccurred: '04-10-2024' },
        ],
      },
      // pass this entire array as arrayofinformationdata to journaltitle.js and distinguish there
      {
        id: 9,
        Symptom: [
          { name: 'Back Pain',  startDate: '05-18-2024', endDate: '04-09-2024'  },
          { name: 'Headache',  startDate: '04-01-2024', endDate: '04-09-2024'  },
        ],
        Illness: [
          { name: 'Common Cold', startDate: '04-01-2024', endDate: '04-09-2024'},
        ],
        TestsAndLabWorks: [
          { name: 'Blood Test', dateOccurred: '04-10-2024'},
          { name: 'X-Ray', dateOccurred: '04-10-2024' },
        ],
      }, 
      
      {
        id: 10,
        Symptom: [
          { name: 'Back Pain',  startDate: '05-28-2024', endDate: '04-09-2024'  },
          { name: 'Headache',  startDate: '04-01-2024', endDate: '04-09-2024'  },
        ],
        Illness: [
          { name: 'Common Cold', startDate: '04-01-2024', endDate: '04-09-2024'},
        ],
        TestsAndLabWorks: [
          { name: 'Blood Test', dateOccurred: '04-10-2024'},
          { name: 'X-Ray', dateOccurred: '04-10-2024' },
        ],
      }, 
      
      {
        id: 11,
        Symptom: [
          { name: 'Back Pain',  startDate: '06-08-2024', endDate: '04-09-2024'  },
          { name: 'Headache',  startDate: '04-01-2024', endDate: '04-09-2024'  },
        ],
        Illness: [
          
        ],
        TestsAndLabWorks: [
          { name: 'Blood Test', dateOccurred: '04-10-2024'},
          { name: 'X-Ray', dateOccurred: '04-10-2024' },
        ],
      },


      // add more data as needed list of string symptom, illness , test and labworks. 
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
  useEffect(()=>{ // citation : https://www.guvi.in/blog/how-to-fetch-data-using-api-in-react/ 
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
    setAppointments(data); // setAppointmentData(data)
    setIsModalVisible(false);
  };

  // handel when user click journal screen entry >> display JournalTitle.js page 
  const handleAppointmentPress =(arryOfAppointmentInfo) =>{
    navigation.navigate('JournalTitle', {arryOfAppointmentInfo}); //https://youtu.be/oBAOr1OswkQ?si=NQ_XdTnzKk3t8xGd
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


  // render appointment item (prepare for displaying)
  const renderAppointmentItem = ({item}) =>(
    <TouchableOpacity style={styles.appointmetnItem} onPress={()=>handleAppointmentPress(item)}>
          <View style={styles.appointmentInfo}>
            <Text style={styles.JournalTitle}>{`Journal ${item.id}`}</Text>
            <Text style={styles.JournalDate}>{displayStartDate(item)}</Text>
     
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
    paddingLeft : 20,
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
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 20,
},
JournalDate: {
    fontSize: 14,
    paddingLeft: 150,
    paddingRight : 20,
    color: '#555',
},
  horizontalListContent : {
    horizontal : '100%',
    width : '100',
    marginTop: 10,
    marginBottom: 10,
  }
});
