// CalendarScreen.js
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView, Platform, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import QuickAddButton from "../../Components/QuickAddButton";
import { fetchAppointments } from "../../LocalStorage/LocalDatabase"; // Update path accordingly
import { useFocusEffect } from "@react-navigation/native";
// dummy data to test

// citation for calendar ondaypress : https://community.draftbit.com/c/code-snippets/low-code-calendar-component
// overall idea (ex theme, markedDates) :  https://www.npmjs.com/package/react-native-calendars
export default function CalendarScreen() {
  const [pickedDate, setPickedDate] = useState(""); // store date from the calendar
  const [appointmentInfo, setAppointmentInfo] = useState({});  // c 
  const [hasDataInPickedDate, setHasDataInPickedDate] = useState(false);

 
  const fetchAppointmentInfo = async () => {
    try {
      const appointments = await fetchAppointments();  // call localdata fetch function and store data into appointments
      const formattedAppointments = {};
  
  // citation for for loop and pushing : https://sliceofdev.com/posts/promises-with-loops-and-array-methods-in-javascript
      for (const ap of appointments) {
        const { eventDate, eventName, eventStartTime, eventEndTime } = ap;
       
        // if formattedAppointments[] doesn't exist then create empty array. 
        if (formattedAppointments[eventDate] === undefined || formattedAppointments[eventDate] === null) {
          formattedAppointments[eventDate] = []; 
        }
        // Push a promise into the array while following format. 
          formattedAppointments[eventDate].push({
            name: eventName,
            date: eventDate,
            start: eventStartTime,
            end: eventEndTime,
          });
        }
  
      setAppointmentInfo(formattedAppointments); // update appointment info
      onclose()
    } catch (error) {
      console.log("Failed to fetch appointment data: ", error);
    }
  };


  useEffect(() => {
    fetchAppointmentInfo();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchAppointmentInfo();
    }, [])
  );
  
  // create render function to display events informaton.
  const renderEvents = () => {
   
    // if fetching from backend was successful use appointmentInfo arrya, else usse dummydata. 
    let eventsData = [];

    // Check if appointments exist for the selected date
    if (appointmentInfo[pickedDate]) {
      eventsData = appointmentInfo[pickedDate];
    }

    return (
      <ScrollView style={styles.eventList}>
        {eventsData.map((event, index) => (
          <View key={index} style={styles.eventItem}>
            <Text style={styles.eventName}>{event.name}</Text>
            <Text style={styles.eventDetail}>Date: {event.date}</Text>
            <Text style={styles.eventDetail}>Start Time: {event.start}</Text>
            <Text style={styles.eventDetail}>End Time: {event.end}</Text>
            {/* Add more details as needed */}
          </View>
        ))}
      </ScrollView>
    );
  };

  // map() :  https://legacy.reactjs.org/docs/lists-and-keys.html, https://medium.com/analytics-vidhya/understanding-the-map-function-in-react-js-1d211916fea7
  return (
    <View style={styles.container}>
      <Calendar
        style={styles.calendarContainer}
        onDayPress={(day) => {
          setPickedDate(day.dateString), console.log("Picked Date", day);
        }}
        markedDates={{
          [pickedDate]: {
            selected: true, 
            marked: true,   
          },
        }}
        
        theme={{
          backgroundColor: "lightgray",
          calendarBackground: "#f9f9f9",
          textSectionTitleColor: "#2c72a3",
          selectedDayBackgroundColor: "#2c72a3",
          selectedDayTextColor: "white",
          todayTextColor: "purple",
          disableTouchEvent: true, // disable touch event on picked date.
        }}
      />
     {renderEvents()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendarContainer: {
    // calendar styling.
    borderWidth: 2,
    padding: 8,
    borderColor: "lightgray",
    minHeight: 350,
  },

  eventList: {
    flex: 1,
    paddingTop: 20,
  },
  eventItem: {
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
    paddingBottom: 10,
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 5,
    ...Platform.select({
      ios: {
        fontFamily: "Times New Roman",
      },
    }),
  },
  eventDetail: {
    fontSize: 15,
    ...Platform.select({
      ios: {
        fontFamily: "Times New Roman", // Set font family to Times New Roman
      },
    }),
  },
  quickAddButtonContainer: {
    position: "absolute",
    bottom: "2%",
    left: "4%",
  },
});