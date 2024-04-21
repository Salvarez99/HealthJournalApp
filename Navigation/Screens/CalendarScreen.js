// CalendarScreen.js
import React, { useState , useEffect} from 'react';
import { View, Text, ScrollView, StyleSheet} from 'react-native';
import { Calendar } from 'react-native-calendars';

// dummy data to test
const dummyData = {
  '2024-04-20': {
    events: [
      {
        name: 'Doctor Appointment',
        date: '2024-04-20',
        start: '10:00 AM',
        end: '11:00 AM',
        location: 'Ualbany Medical Center'
      },
      {
        name:'Dr. John Carter - Dermatologist',
        date: '2024-04-20',
        start: '12:00 PM',
        end: '1:00 PM',
        location: 'Skin Health Clinic, 456 Skin Ave., NYC'
      },
      {
        name:'Dr. Laura Casey - Pediatrician',
        date: '2024-04-20',
        start: '2:00 PM',
        end: '4:00 PM',
        location: 'Family Health Clinic, 789 Child Ln., middletown',
        
      },
      {
        name: 'Dr. Alan Grant - Ophthalmologist',
        date: '2024-04-20',
        start: '4:00 PM',
        end: '4:40 PM',
        location: 'Clear Vision Eye Center, 234 Sight St., Lookville'
      },
      {
        name: 'Dr. Emily Stone - Cardiologist',
        date: '2024-04-20',
        start: '2:00 PM',
        end: '4:00 PM',
        location: 'Heart Care Institute, 101 Heartbeat Blvd., Cardiocity'
      },
    ]
  },
  '2024-04-21': {
    events: [
      {
        name: 'Dr. Alan Grant - Ophthalmologist',
        date: '2024-04-21',
        start: '9:00 AM',
        end: '12:00 PM',
        location: 'Clear Vision Eye Center, 234 Sight St., Lookville'
      },
      {
        name: 'Dr. Susan Hill - General Practitioner',
        date: '2024-04-21',
        start: '2:00 PM',
        end: '3:00 PM',
        location: 'Hill Medical Center, 123 Health St., Cityville'
      }
    ]
  },
  '2024-04-22': {
    events: [
      {
        name: 'Dr. Laura Casey - Pediatrician',
        date: '2024-04-22',
        start: '11:00 AM',
        end: '1:00 PM',
        location: 'Family Health Clinic, 789 Child Ln., Smalltown'
      }
    ]
  }
};

// citation for calendar ondaypress : https://community.draftbit.com/c/code-snippets/low-code-calendar-component
// overall idea (ex theme, markedDates) :  https://www.npmjs.com/package/react-native-calendars
export default function CalendarScreen() {
  const [pickedDate, setPickedDate] = useState(''); // store date from the calendar
  const [appointmentInfo, setAppointmentInfo] = useState(''); // store fetched appointment data and set its status. 
  const [hasDataInPickedDate, setHasDataInPickedDate] = useState(false);


  // same fetech function : fetch from backend API, store in data, else return error 
  const fetchAppointmentInfo = async () => {
    try {
      const response = await fetch('take-backend-api-url'); // Update this with your actual backend API endpoint
      const data = await response.json();
      setAppointmentInfo(data);
    } catch (error) {
      console.log('Failed to fetch appointment data: ', error);
    }
  };

  useEffect(() => {
    fetchAppointmentInfo();
  }, []);


  // check whether clicked date has data - check with actual data from backend 
  // citation: use useEffect() with if else : https://forum.freecodecamp.org/t/react-useeffect-cleanup-function-within-if-statement/556965
  useEffect(() => {
    if (pickedDate &&  appointmentInfo[pickedDate]) {
      setHasDataInPickedDate(true);
    } else {
      setHasDataInPickedDate(false);
    }
  }, [pickedDate, appointmentInfo]);
  
  // create render function to display events informaton. 
  const renderEvents = () => {
    if (hasDataInPickedDate) {
    return (
      <ScrollView style={styles.eventList}>
        {appointmentInfo[pickedDate].map((data, index) => (
          <View key={index} style={styles.eventItem}>
            <Text style={styles.eventName}>{data.eventName}</Text>
            <Text style={styles.eventDetail}>Date: {data.date}</Text>
            <Text style={styles.eventDetail}>Start Time: {data.startTime}</Text>
            <Text style={styles.eventDetail}>End Time: {data.endTime}</Text>
            <Text style={styles.eventDetail}>Location: {data.location}</Text>
          </View>
        ))}
      </ScrollView>
    );
        } else{
          return null; 
        }
  };

 // map() :  https://legacy.reactjs.org/docs/lists-and-keys.html, https://medium.com/analytics-vidhya/understanding-the-map-function-in-react-js-1d211916fea7
  return (
    <View style={styles.container}>
      <Calendar style={styles.calendarContainer}
            onDayPress={day => { setPickedDate(day.dateString),  console.log('Picked Date', day); }}
            markedDates={{
              [pickedDate]: {
                selected: true,
              }
            }}
            theme={{backgroundColor : 'lightgray', 
                    calendarBackground : 'lightyellow',
                    textSectionTitleColor : 'blue',
                    selectedDayBackgroundColor : 'purple', 
                    selectedDayTextColor : 'white', 
                    todayTextColor : 'blue', 
                    disableTouchEvent: true // disable touch event on picked date.
                  }}  
          />
     <ScrollView style={styles.eventList}>
      {pickedDate && dummyData[pickedDate] && dummyData[pickedDate].events.map((event, index) => (
        <View key={index} style={styles.eventItem}>
          <Text style={styles.eventName}>{event.name}</Text>
          <Text style={styles.eventDetail}>Date: {event.date}</Text>
          <Text style={styles.eventDetail}>Start Time: {event.start}</Text>
          <Text style={styles.eventDetail}>End Time: {event.end}</Text>
          <Text style={styles.eventDetail}>Location: {event.location}</Text>
        </View>
      ))}
    </ScrollView>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {  
    flex: 1,
  },
  calendarContainer : { // calendar styleing. 
    borderWidth : 2, 
    padding : 8, 
    borderColor : 'lightgray', 
    minHeight : 350,
  }, 

  eventList: {
    flex: 1,
    paddingTop: 20,
  },
  eventItem: {
    paddingLeft : 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    paddingBottom: 10,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Times New Roman',
    paddingBottom : 5,
  },
  eventDetail: {
    fontSize : 15,
    fontFamily: 'Times New Roman', // Set font family to Times New Roman
  },

});

