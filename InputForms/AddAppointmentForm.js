/***************************************************************************************
 * Authors: Stephen Alvarez
 * Date: 5/1/2024
 * Code Version: 1.0
 * 
 * Description:
 *  Renders a form that takes user input to fill out fields required for appointments.
 * Adds gathered data to local appointment table when onSave() is triggered or clears data when form  
 * is closed without changing tables.
 * 
 * 
 ***************************************************************************************/

import Ionicons from "react-native-vector-icons/Ionicons"; //Vector Icons are used for button icons
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Platform,
  TextInput,
} from "react-native";

import Appointment from "../Classes/Appointment";
import DatePicker from "../Components/DatePicker";
import TimePicker from "../Components/TimePicker";
import {
  addAppointment, //Add appointment to appointment table
  clearAppointments, //Clear the apppointment table
  } from "../LocalStorage/LocalDatabase"; 

const AddAppointmentForm = ({ isVisible, onClose }) => {
  const [eventName, setEventName] = new useState("");
  const [eventDate, setEventDate] = new useState(new Date());
  const [eventStartTime, setEventStartTime] = new useState('');
  const [eventEndTime, setEventEndTime] = new useState('');
  let appointment = null; //To be used to store data into an {Appointment} instance

  const convertDateFormat = (dateString) => {
    const parts = dateString.split('-');
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    return `${month}-${day}-${year}`;
  };

  //When the date is changed store and format the selected date
  const handleDateChange = (selectedDate) => {
    const dateObj = new Date(selectedDate);

    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth()+1).toString().padStart(2,'0');
    const day = dateObj.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    setEventDate(formattedDate);
    console.log(formattedDate);
  };

  const handleStartTimeChange = (startTime) => {
    setEventStartTime(startTime);
    // console.log("StartTime: " + startTime);
  };

  const handleEndTimeChange = (endTime) => {
    setEventEndTime(endTime);
    // console.log("EndTime: " + endTime);
  };

  /**
   * Resets form's fields to default values then closes form
   */
  const clearFields = () => {
    setEventName("");
    setEventDate(new Date().toLocaleDateString());
    setEventStartTime(null);
    setEventEndTime(null);
    console.log("Appointment form closed");
    onClose();
  };

  /**
   * Takes collected user data and pushes the data either to local storage
   */
  const onSave = async () => {
    const eName = eventName;
    const eDate = eventDate;
    const eStartTime = eventStartTime;
    const eEndTime = eventEndTime;

    //Checks if required fields are inputted in the correct format
    //eName is not just whitespace
    //eStartTime and eEndTime are not null
    if(!/^\s*$/.test(eName) && eStartTime != null && eEndTime != null){
      appointment = new Appointment(eName, eventDate, eStartTime, eEndTime);
      console.log(appointment.toString());
      clearFields();
    }else{
      alert('Required fields missing.\nRequired fields contains \'*\'.')
    }

    try {
      // call localDatabase's addappointment function to store entered data into local database. 
      const data = await addAppointment(eventName, eventDate, eventStartTime, eventEndTime);

      console.log(`{adding Page} Appointment added with ID: ${data}`);

      //reset the entering field. after saving into local database table. 
      setEventName("");
      setEventDate(new Date());
      setEventStartTime('');
      setEventEndTime('');

      onClose(); // Close the modal
    } catch (error) {
      //If an error is encountered when saving, alert the user that saving has failed
      console.error("Error adding appointment:", error);
      alert('Failed to add appointment. Please try again.');
    }
  };


  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalForm}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}> Add Appointment</Text>
            <TouchableOpacity
              onPress={clearFields}
              style={{
                position: "absolute",
                right: 20,
                top: 12,
              }}
            >
              <Ionicons name={"close"} size={28} color={"black"} />
            </TouchableOpacity>
          </View>

          <View style={styles.modalFormContent}>
            {/**Form content goes in this scope */}
            <View style={styles.inputEventName}>
              <Text style={styles.buttonHeaderText}>*Event Name: </Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: "black",
                  paddingLeft: 5,
                }}
                value={eventName}
                onChangeText={setEventName}
              />
            </View>

            {/**Date and Time pickers used to gather date and time data */}
            <DatePicker name={"Date"} onDateChange={handleDateChange} />
            <TimePicker name={"*Start time"} onTimeChange={handleStartTimeChange}/>
            <TimePicker name={"*End time"} onTimeChange={handleEndTimeChange} />

            {/**Save button that calls onSave function */}
            <View style={styles.saveButtonContainer}>
              <TouchableOpacity onPress={onSave} style={styles.saveButton}>
                <Text>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalForm: {
    backgroundColor: "white",
    width: "90%",
    height: 350,
    borderRadius: 10,
    alignItems: "center",
    position: "absolute",
    top: 60,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  modalHeader: {
    height: 50,
    backgroundColor: "#d7dbe0",
    padding: 12,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalFormContent: {
    height: 50,
    backgroundColor: "white",
    width: "100%",
    height: "90%",
    padding: 18,
    paddingTop: 5,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },

  saveButtonContainer: {
    position: "absolute",
    right: 15,
    bottom: 15,
  },
  saveButton: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "lightblue",
    width: 70,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  buttonHeaderText: {
    fontWeight: "bold",
    paddingTop: 4,
  },
});

export default AddAppointmentForm;
