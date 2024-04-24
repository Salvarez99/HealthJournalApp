import Ionicons from "react-native-vector-icons/Ionicons";
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

import DatePicker from "../Components/DatePicker";
import TimePicker from "../Components/TimePicker";
import Appointment from "../Classes/Appointment";

const AddAppointmentForm = ({ isVisible, onClose }) => {
  const [eventName, setEventName] = new useState("");
  const [eventDate, setEventDate] = new useState(new Date());
  const [eventStartTime, setEventStartTime] = new useState(null);
  const [eventEndTime, setEventEndTime] = new useState(null);
  let appointment = null;

  const handleDateChange = (selectedDate) => {
    const formattedDate = selectedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    setEventDate(formattedDate);
    // console.log(formattedDate);
  };

  const handleStartTimeChange = (startTime) => {
    setEventStartTime(startTime);
    // console.log("StartTime: " + startTime);
  };

  const handleEndTimeChange = (endTime) => {
    setEventEndTime(endTime);
    // console.log("EndTime: " + endTime);
  };

  const clearFields = () => {
    setEventName("");
    setEventDate(new Date().toLocaleDateString());
    setEventStartTime(null);
    setEventEndTime(null);
    console.log("Appointment form closed");
    onClose();
  };

  //TODO: Implement save functionality
  const onSave = () => {
    appointment = new Appointment(
      eventName,
      eventDate,
      eventStartTime,
      eventEndTime
    );
    console.log(appointment.toString());
    clearFields();
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
            <View style={styles.inputEventName}>
              <Text style={styles.buttonHeaderText}>Event Name: </Text>
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
              {/* {console.log(eventName)} */}
            </View>

            <DatePicker name={"Date"} onDateChange={handleDateChange} />

            <TimePicker
              name={"Start time"}
              onTimeChange={handleStartTimeChange}
            />
            <TimePicker name={"End time"} onTimeChange={handleEndTimeChange} />

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
