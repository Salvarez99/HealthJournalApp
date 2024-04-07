import React , { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, } from 'react-native';
import QuickAddButton from '../../Components/QuickAddButton';
import AddJournalEntryForm from '../../InputForms/AddJournalEntryForm'
import AddAppointmentForm from '../../InputForms/AddAppointmentForm'
import AddMedicationForm from '../../InputForms/AddMedicationForm'
// define backend API >> fetch data from backend ex fetch >> parse and set data to display 

export default function MedicationScreen({ navigation }) {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectedModal, setSelectedModal] = React.useState(null);
  //  for handleing medicatoin input information that retrived from addmedicationform.js >> backend >> medicationscree.js 
  const [medications , setMedications] = useState([]); 


  //Dummy datat for testing 
  useEffect(()=>{
    // const value 
    const dummyMedications = [
        {
          id: 1,
          name: 'Medicine 1',
          dosage: '10mg',
          dosageSchedule: ['Morning', 'Evening'],
          frequency : [1,3,5],
        },

        {
          id: 2,
          name: 'Medicine 2',
          dosage: '20mg',
          dosageSchedule: ['Morning', 'Midday', 'Evening'],
          frequency : [1,3,5],
        },
        {
          id: 3,
          name: 'Medicine 3',
          dosage: '30mg',
          dosageSchedule: ['Morning', 'Midday', 'Evening'],
          frequency : [0,1,3,5],
        },
        {
          id: 4,
          name: 'Medicine 4',
          dosage: '40mg',
          dosageSchedule: ['Morning', 'Midday', 'Evening'],
          frequency : [2,4,6],
        },
        {
          id: 5,
          name: 'Medicine 5',
          dosage: '50mg',
          dosageSchedule: ['Morning', 'Midday', 'Evening'],
          frequency : [1,3,5],
        },
        {
          id: 6,
          name: 'Medicine 6',
          dosage: '60mg',
          dosageSchedule: ['Morning', 'Midday', 'Evening'],
          frequency : [1,3,5],
        },
        {
          id: 7,
          name: 'Medicine 7',
          dosage: '70mg',
          dosageSchedule: ['Morning', 'Midday', 'Evening'],
          frequency : [1,5],
        },
        {
          id: 8,
          name: 'Medicine 8',
          dosage: '80mg',
          dosageSchedule: ['Morning', 'Midday', 'Evening'],
          frequency : [1],
        },
        {
          id: 9,
          name: 'Medicine 9',
          dosage: '90mg',
          dosageSchedule: ['Morning', 'Midday', 'Evening'],
          frequency : [1,2,3,4,5,6],
        },
    ];

    // set medications 
    setMedications(dummyMedications)
  }, []); 

  // define fetchMeidcationData() function 
  const fetchMedicationData = async() => {
    try{
      // get backend API endpoint 
      //citation : https://dmitripavlutin.com/javascript-fetch-async-await/
      const request = await fetch('take-backend-api-url'); // update this with actual link 
      const data =- await Response.json(); 
      setMedications(data); // get data from backend api and set it with setMedications() state hook 
    }catch(error){
      console.log('fail to fatch medication data : ', error);
    }
  };

  // for later fetch data from backend API 
  useEffect(()=>{  // citation :  https://www.guvi.in/blog/how-to-fetch-data-using-api-in-react/
    // fetch data from backend API 
    fetchMedicationData();  // call asyn fucntion
  }, [])

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
        return <AddAppointmentForm isVisible={isModalVisible} onClose={closeModal} />;
      case 'AddMedicationForm':
        return <AddMedicationForm isVisible={isModalVisible} onClose={closeModal} />;
        case 'AddJournalEntryForm':
            return <AddJournalEntryForm isVisible={isModalVisible} onClose={closeModal} />;
      default:
        return null;
    }
  };

  // convert received list of int into appropriate frequency (string type) ex) 0,1 conver to Sunday Monday 
  const convertFrequencyList  = ( frequency) => {
    const days = ['S', 'M', 'T', 'W', 'TH', 'F','S']; 
    let outputList = []; 
    for(let i =0; i < frequency.length; i++){
      outputList.push(days[frequency[i]]); 
    }
    return outputList.join(', '); 
  }; 


  // create what we are going to render / display to screen. 
  const renderMedicationItem = ({ item }) => (
    <View style={styles.medicationItem}>
      
      <Text style={styles.medicationName}>{item.name}</Text>
   
      <View style={styles.rightContent}>
        <Text>{`Dosage: ${item.dosage}`}</Text>
        <Text>{`${item.dosageSchedule.join(', ')}`}</Text>
        <Text >{`${convertFrequencyList(item.frequency)}`}</Text>
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
                  keyExtractor={(item)=> item.id.toString()}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  quickAddButtonContainer: {
    position: 'absolute',
    bottom: '2%',
    left: '4%',
  },

  flatListContainer :{
    horizontal : '100%',
    flex : 1, // take entire screen vertically. 
  },


 medicationItem: {
  flexDirection: 'row',
  padding: 20,
  borderBottomWidth: 1,
  borderColor: '#ccc',
},
rightContent: {
  paddingLeft : 100,
  paddingTop : 0,
  
},


medicationName: {
  fontWeight: 'bold',
},
});
